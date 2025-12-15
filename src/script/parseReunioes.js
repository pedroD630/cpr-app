export async function montarFDS(payload) {
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
            payload.partes.push({
                nome,
                participante,
                tempo
            });
        }
    });

    return payload;
}

export async function montarMDS(payload) {
    const partes = [
        ['Comentários Iniciais', 'comentariosIniciais', 'tempoComentariosIniciais'],

        ['Discurso', 'discurso', 'tempoDiscurso'],
        ['Encontre Joias', 'encontreJoias', 'tempoEncontreJoias'],
        ['Leitura da Bíblia', 'leituraBiblia', 'tempoLeituraBiblia'],
        ['Conselho (Tesouros)', 'conselho1', 'tempoConselho1'],

        ['Parte 1 (Ministério)', 'parte1', 'tempoParte1'],
        ['Conselho (Ministério 1)', 'conselho2', 'tempoConselho2'],
        ['Parte 2 (Ministério)', 'parte2', 'tempoParte2'],
        ['Conselho (Ministério 2)', 'conselho3', 'tempoConselho3'],
        ['Parte 3 (Ministério)', 'parte3', 'tempoParte3'],
        ['Conselho (Ministério 3)', 'conselho4', 'tempoConselho4'],
        ['Parte 4 (Ministério)', 'parte4', 'tempoParte4'],
        ['Conselho (Ministério 4)', 'conselho5', 'tempoConselho5'],

        ['NVC – Parte 1', 'NvcParte1', 'tempoNvcParte1'],
        ['NVC – Parte 2', 'NvcParte2', 'tempoNvcParte2'],
        ['NVC – Parte 3', 'NvcParte3', 'tempoNvcParte3'],
        ['Estudo Bíblico', 'estudoBiblico', 'tempoEstudoBiblico'],
        ['Comentários Finais', 'comentariosFinais', 'tempoComentariosFinais'],
        ['Anúncios', 'anuncios', 'tempoAnuncios']
    ];

    partes.forEach(([nome, participanteId, tempoId]) => {
        const participante = document.getElementById(participanteId)?.value || '';
        const tempo = document.getElementById(tempoId)?.value || '';

        if (participante || tempo) {

            if(tempo === '00:00') return;
            
            payload.partes.push({
                nome,
                participante,
                tempo
            });
        }
    });

    return payload;
}