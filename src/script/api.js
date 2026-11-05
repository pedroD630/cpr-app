import { apiUrl } from "./utils.js";

const CHAVE_SESSAO = "sessao";
let renovacaoEmAndamento = null;

export class ErroRequisicao extends Error {
    constructor(status, mensagem) {
        super(mensagem);
        this.status = status; // 0 = sem conexão com o servidor
    }
}

export function getSessao() {
    const sessao = localStorage.getItem(CHAVE_SESSAO);
    return sessao ? JSON.parse(sessao) : null;
}

export function salvarSessao(sessao) {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
}

export function encerrarSessao() {
    localStorage.removeItem(CHAVE_SESSAO);
}

export async function requisicao(rota, { metodo = "GET", corpo, token } = {}) {
    const headers = {};
    if (corpo) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;

    let resposta;
    try {
        resposta = await fetch(`${apiUrl}${rota}`, {
            method: metodo,
            headers,
            body: corpo ? JSON.stringify(corpo) : undefined
        });
    } catch {
        throw new ErroRequisicao(0, "Sem conexão com o servidor");
    }

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        throw new ErroRequisicao(resposta.status, dados?.erro ?? "Erro ao falar com o servidor");
    }

    return dados;
}

// O refresh token só vale uma vez: chamadas simultâneas precisam dividir a mesma
// renovação, ou a segunda derrubaria a sessão.
function renovarSessao() {
    renovacaoEmAndamento ??= (async () => {
        try {
            const { sessao } = await requisicao("/auth/renovar", {
                metodo: "POST",
                corpo: { refresh_token: getSessao()?.refresh_token }
            });
            salvarSessao(sessao);
            return sessao;
        } catch (erro) {
            // Sem conexão a sessão continua válida para uma nova tentativa.
            if (erro.status !== 0) encerrarSessao();
            throw erro;
        } finally {
            renovacaoEmAndamento = null;
        }
    })();

    return renovacaoEmAndamento;
}

// Chamada autenticada: renova a sessão expirada e repete a requisição uma vez.
export async function api(rota, opcoes = {}) {
    const sessao = getSessao();
    if (!sessao) throw new ErroRequisicao(401, "Faça login para continuar");

    try {
        return await requisicao(rota, { ...opcoes, token: sessao.access_token });
    } catch (erro) {
        if (erro.status !== 401) throw erro;

        const novaSessao = await renovarSessao();
        return requisicao(rota, { ...opcoes, token: novaSessao.access_token });
    }
}
