export function montarFds(payload) {
    const partes = [
        ['Comentários Iniciais', 'comentariosIniciais', 'tempoComentariosIniciais'],
        ['Discurso Público', 'discursoPublico', 'tempoDiscursoPublico'],
        ['Estudo A Sentinela', 'estudoSentinela', 'tempoEstudoSentinela'],
        ['Comentários Finais', 'comentariosFinais', 'tempoComentariosFinais'],
        ['Anúncios', 'anuncios', 'tempoAnuncios']
    ];

    partes.forEach(([nome, pId, tId]) => {
        const participante = document.getElementById(pId).value;
        const tempo = document.getElementById(tId).value;

        if (participante || tempo) {
            payload.partes.push({nome, participante, tempo});
        }
    });

    return payload;
}