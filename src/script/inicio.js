import { api, encerrarSessao } from "./api.js";
import { enviarPendentes, temPendentes } from "./reunioes.js";

const TIPOS = { mds: "Meio de Semana", fds: "Fim de Semana" };

const historico = document.getElementById("historico");
const avisoHistorico = document.getElementById("avisoHistorico");

// Nomes e demais dados vêm do usuário: entram sempre como texto, nunca como HTML.
function criar(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

function formatarData(data) {
    return data.split("-").reverse().join("/");
}

function formatarDuracao(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    return horas ? `${horas}h ${minutos}min` : `${minutos}min`;
}

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    return `${minutos}:${String(segundos % 60).padStart(2, "0")}`;
}

function criarCampo(rotulo, valor) {
    const paragrafo = criar("p", "card-text mb-1");
    paragrafo.append(criar("strong", "", `${rotulo}: `), valor);
    return paragrafo;
}

function criarListaPartes(partes) {
    const detalhes = criar("details", "mt-2");
    detalhes.append(criar("summary", "", "Ver partes"));

    const lista = criar("ul", "list-unstyled mt-2 mb-0");
    for (const parte of partes) {
        const item = criar("li", "mb-2");
        const nome = parte.secao ? `${parte.nome} (${parte.secao})` : parte.nome;
        item.append(criar("div", "fw-medium", nome));
        item.append(criar("div", "small text-body-secondary", [formatarTempo(parte.duracao_segundos), parte.quem_fez].filter(Boolean).join(" · ")));
        lista.append(item);
    }

    detalhes.append(lista);
    return detalhes;
}

function mostrarAvisoHistorico(texto) {
    avisoHistorico.textContent = texto;
    avisoHistorico.classList.toggle("d-none", !texto);
}

async function excluirReuniao(reuniao, coluna) {
    if (!confirm(`Excluir a reunião de ${formatarData(reuniao.data)}?`)) return;

    try {
        await api(`/reuniao/${reuniao.id}`, { metodo: "DELETE" });
        coluna.remove();
        if (!historico.children.length) mostrarAvisoHistorico("Nenhuma reunião registrada.");
    } catch (erro) {
        alert(`Não foi possível excluir: ${erro.message}`);
    }
}

function criarCard(reuniao) {
    const coluna = criar("div", "col");
    const card = criar("div", "card h-100");
    const corpo = criar("div", "card-body");

    corpo.append(
        criar("h5", "card-title", `Reunião ${TIPOS[reuniao.tipo_reuniao]}`),
        criarCampo("Data", formatarData(reuniao.data)),
        criarCampo("Duração", formatarDuracao(reuniao.tempo_total_segundos))
    );

    if (reuniao.partes.length) corpo.append(criarListaPartes(reuniao.partes));

    const excluir = criar("button", "btn btn-outline-danger btn-sm mt-3", "Excluir");
    excluir.type = "button";
    excluir.addEventListener("click", () => excluirReuniao(reuniao, coluna));
    corpo.append(excluir);

    card.append(corpo);
    coluna.append(card);
    return coluna;
}

async function carregarCongregacao() {
    const congregacao = await api("/congregacao");
    document.getElementById("nomeCongregacao").textContent = congregacao.nome;
}

async function carregarHistorico() {
    const reunioes = await api("/reuniao");
    historico.replaceChildren(...reunioes.map(criarCard));
    mostrarAvisoHistorico(reunioes.length ? "" : "Nenhuma reunião registrada.");
}

function tratarErroCarregamento(erro) {
    if (erro.status === 401) {
        encerrarSessao();
        location.replace("/src/login.html");
        return;
    }
    mostrarAvisoHistorico("Não foi possível carregar o histórico. Verifique a conexão.");
}

document.getElementById("sair").addEventListener("click", () => {
    if (temPendentes() && !confirm("Há reuniões aguardando envio. Elas serão enviadas no próximo login desta congregação. Sair mesmo assim?")) {
        return;
    }
    encerrarSessao();
    location.replace("/src/login.html");
});

async function iniciar() {
    try {
        const pendentes = await enviarPendentes();
        const aviso = document.getElementById("avisoPendentes");
        aviso.textContent = `${pendentes} reunião(ões) aguardando envio.`;
        aviso.classList.toggle("d-none", pendentes === 0);

        await Promise.all([carregarCongregacao(), carregarHistorico()]);
    } catch (erro) {
        tratarErroCarregamento(erro);
    }
}

iniciar();
