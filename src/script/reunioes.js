import { api, getSessao } from "./api.js";
import { limparStorage } from "./salvar-local.js";

const CHAVE_PENDENTES = "reunioesPendentes";

function getPendentes() {
    return JSON.parse(localStorage.getItem(CHAVE_PENDENTES) ?? "[]");
}

function salvarPendentes(pendentes) {
    localStorage.setItem(CHAVE_PENDENTES, JSON.stringify(pendentes));
}

function hojeLocal() {
    const agora = new Date();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return `${agora.getFullYear()}-${mes}-${dia}`;
}

// O campo de nome tem o id do tempo sem o prefixo: tempoDiscurso -> discurso.
// A inicial varia entre os campos (parte1, NvcParte1), por isso testamos as duas.
function montarParte(campoTempo) {
    const sufixo = campoTempo.id.replace(/^tempo/, "");
    const inicialMinuscula = sufixo[0].toLowerCase() + sufixo.slice(1);
    const campoNome = document.getElementById(inicialMinuscula) ?? document.getElementById(sufixo);

    return {
        chave: campoNome.id,
        tempo: campoTempo.value,
        quem_fez: campoNome.value
    };
}

function montarReuniao(tipoReuniao) {
    const horaInicio = document.getElementById("horaInicio").value;
    const horaFim = document.getElementById("horaFim").value;
    const tempoTotal = document.getElementById("tempoTotal").value;

    if (!horaInicio || !horaFim || !tempoTotal) return null;

    return {
        tipo_reuniao: tipoReuniao,
        data: hojeLocal(),
        hora_inicio: horaInicio,
        hora_fim: horaFim,
        tempo_total: tempoTotal,
        partes: [...document.querySelectorAll(".tempo-parte")].map(montarParte)
    };
}

async function enviarReuniao(reuniao) {
    // A fila guarda o dono: outra congregação pode entrar neste aparelho depois.
    const usuario_id = getSessao()?.usuario_id;

    try {
        await api("/reuniao", { metodo: "POST", corpo: reuniao });
        return { salva: true, mensagem: "Reunião salva no histórico." };
    } catch (erro) {
        if (erro.status === 409) {
            return { salva: true, mensagem: "Esta reunião já estava no histórico." };
        }
        if (erro.status === 400) {
            return {
                salva: false,
                mensagem: `Reunião não salva: ${erro.message}. Corrija e gere o relatório de novo.`
            };
        }

        salvarPendentes([...getPendentes(), { usuario_id, reuniao }]);
        return {
            salva: true,
            mensagem: "Não foi possível enviar agora. A reunião será enviada quando você abrir o app novamente."
        };
    }
}

export async function concluirReuniao(tipoReuniao) {
    const status = document.getElementById("statusEnvio");
    const reuniao = montarReuniao(tipoReuniao);

    if (!reuniao) {
        status.textContent = "Reunião não salva: faltam a hora de início, a hora de fim ou o tempo total.";
        return;
    }

    status.textContent = "Salvando reunião...";

    const { salva, mensagem } = await enviarReuniao(reuniao);
    status.textContent = mensagem;

    if (salva) limparStorage();
}

// Reenvia as reuniões da congregação logada. Devolve quantas continuam na fila.
export async function enviarPendentes() {
    const usuarioAtual = getSessao()?.usuario_id;
    const restantes = [];

    for (const item of getPendentes()) {
        if (item.usuario_id !== usuarioAtual) {
            restantes.push(item);
            continue;
        }

        try {
            await api("/reuniao", { metodo: "POST", corpo: item.reuniao });
        } catch (erro) {
            if (erro.status !== 409) restantes.push(item);
        }
    }

    salvarPendentes(restantes);

    return restantes.filter((item) => item.usuario_id === usuarioAtual).length;
}

export function temPendentes() {
    const usuarioAtual = getSessao()?.usuario_id;
    return getPendentes().some((item) => item.usuario_id === usuarioAtual);
}
