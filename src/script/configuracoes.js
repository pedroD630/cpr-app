import { api, encerrarSessao, salvarSessao } from "./api.js";

function mostrar(idMensagem, texto, tipo) {
    const mensagem = document.getElementById(idMensagem);
    mensagem.textContent = texto;
    mensagem.className = `alert alert-${tipo}`;
}

async function enviarFormulario(form, idMensagem, acao) {
    const botao = form.querySelector("button[type=submit]");
    botao.disabled = true;

    try {
        const texto = await acao();
        mostrar(idMensagem, texto, "success");
        form.reset();
    } catch (erro) {
        mostrar(idMensagem, erro.message, "danger");
    } finally {
        botao.disabled = false;
    }
}

const formSenha = document.getElementById("formSenha");
formSenha.addEventListener("submit", (event) => {
    event.preventDefault();
    enviarFormulario(formSenha, "mensagemSenha", async () => {
        const { sessao } = await api("/auth/senha", {
            metodo: "PUT",
            corpo: {
                senha_atual: document.getElementById("senhaAtual").value,
                nova_senha: document.getElementById("novaSenha").value
            }
        });
        // A troca encerra a sessão antiga: sem isto o app sairia da conta.
        salvarSessao(sessao);
        return "Senha alterada.";
    });
});

const formCadastro = document.getElementById("formCadastro");
formCadastro.addEventListener("submit", (event) => {
    event.preventDefault();
    enviarFormulario(formCadastro, "mensagemCadastro", async () => {
        const nome = document.getElementById("nomeNovaCongregacao").value;
        const login = document.getElementById("loginNovaCongregacao").value;

        await api("/congregacao", {
            metodo: "POST",
            corpo: {
                nome_congregacao: nome,
                login,
                senha: document.getElementById("senhaNovaCongregacao").value,
                aceitou_termos: document.getElementById("aceiteNovaCongregacao").checked
            }
        });
        return `Congregação ${nome.trim()} cadastrada. Acesso: ${login.trim().toLowerCase()}`;
    });
});

async function iniciar() {
    try {
        const congregacao = await api("/congregacao");
        document.getElementById("nomeCongregacao").textContent = congregacao.nome;
        // Só esconde a interface: quem não é admin também é barrado na API e no banco.
        document.getElementById("secaoAdmin").classList.toggle("d-none", !congregacao.admin);
    } catch (erro) {
        if (erro.status === 401) {
            encerrarSessao();
            location.replace("/src/login.html");
        }
    }
}

iniciar();
