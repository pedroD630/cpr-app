import { getSessao, requisicao, salvarSessao } from "./api.js";

const INICIO = "/index.html";

if (getSessao()) location.replace(INICIO);

const form = document.getElementById("formAcesso");
const mensagem = document.getElementById("mensagemAcesso");
const enviar = document.getElementById("enviarAcesso");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    enviar.disabled = true;

    try {
        const { sessao } = await requisicao("/auth/login", {
            metodo: "POST",
            corpo: {
                login: document.getElementById("login").value,
                senha: document.getElementById("senha").value
            }
        });
        salvarSessao(sessao);
        location.replace(INICIO);
    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.className = "alert alert-danger";
    } finally {
        enviar.disabled = false;
    }
});
