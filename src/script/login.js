import { getSessao, requisicao, salvarSessao } from "./api.js";

const INICIO = "/index.html";

if (getSessao()) location.replace(INICIO);

const form = document.getElementById("formAcesso");
const titulo = document.getElementById("tituloAcesso");
const mensagem = document.getElementById("mensagemAcesso");
const enviar = document.getElementById("enviarAcesso");
const alternar = document.getElementById("alternarAcesso");
const nomeCongregacao = document.getElementById("nomeCongregacao");
const aceitouTermos = document.getElementById("aceitouTermos");
const senha = document.getElementById("senha");

let cadastrando = false;

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `alert alert-${tipo}`;
}

function definirModo(novoModoCadastro) {
    cadastrando = novoModoCadastro;

    const textoPrincipal = cadastrando ? "Cadastrar congregação" : "Entrar";
    titulo.textContent = textoPrincipal;
    enviar.textContent = textoPrincipal;
    document.title = textoPrincipal;
    alternar.textContent = cadastrando ? "Já tenho cadastro" : "Cadastrar congregação";

    document.getElementById("campoCongregacao").classList.toggle("d-none", !cadastrando);
    document.getElementById("campoTermos").classList.toggle("d-none", !cadastrando);

    nomeCongregacao.required = cadastrando;
    aceitouTermos.required = cadastrando;
    senha.autocomplete = cadastrando ? "new-password" : "current-password";
}

async function entrar(email) {
    const { sessao } = await requisicao("/auth/login", {
        metodo: "POST",
        corpo: { email, senha: senha.value }
    });
    salvarSessao(sessao);
    location.replace(INICIO);
}

async function cadastrar(email) {
    const { sessao, confirmacao_pendente } = await requisicao("/auth/cadastro", {
        metodo: "POST",
        corpo: {
            email,
            senha: senha.value,
            nome_congregacao: nomeCongregacao.value,
            aceitou_termos: aceitouTermos.checked
        }
    });

    if (confirmacao_pendente) {
        definirModo(false);
        mostrarMensagem("Cadastro feito. Confirme o e-mail recebido para entrar.", "success");
        return;
    }

    salvarSessao(sessao);
    location.replace(INICIO);
}

alternar.addEventListener("click", () => {
    mensagem.className = "alert d-none";
    definirModo(!cadastrando);
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    enviar.disabled = true;

    try {
        const email = document.getElementById("email").value;
        await (cadastrando ? cadastrar(email) : entrar(email));
    } catch (erro) {
        mostrarMensagem(erro.message, "danger");
    } finally {
        enviar.disabled = false;
    }
});
