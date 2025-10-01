export function copiarRelatorio(tipoReuniao) {
    let texto = "";
    if (tipoReuniao === "fds") {
        const horaInicio = document.getElementById("horaInicio").value;
        const comentariosIniciais = document.getElementById("comentariosIniciais").value || "";
        const tempoComentariosIniciais = document.getElementById("tempoComentariosIniciais").value || "";
        const discursoPublico = document.getElementById("discursoPublico").value;
        const tempoDiscursoPublico = document.getElementById("tempoDiscursoPublico").value;
        const estudoSentinela = document.getElementById("estudoSentinela").value;
        const tempoEstudoSentinela = document.getElementById("tempoEstudoSentinela").value;
        const comentariosFinais = document.getElementById("comentariosFinais").value;
        const tempoComentariosFinais = document.getElementById("tempoComentariosFinais").value;
        const anuncios = document.getElementById("anuncios").value;
        const tempoAnuncios = document.getElementById("tempoAnuncios").value;
        const horaFim = document.getElementById("horaFim").value;
        const tempoTotal = document.getElementById("tempoTotal").value;

        texto += `**Hora Início**: ${horaInicio}\n`;
        texto += `**Comentários Iniciais**: ${comentariosIniciais} (${tempoComentariosIniciais})\n`;
        texto += `**Discurso Público**: ${discursoPublico} (${tempoDiscursoPublico})\n`;
        texto += `**Estudo de A Sentinela**: ${estudoSentinela} (${tempoEstudoSentinela})\n`;
        texto += `**Comentários Finais**: ${comentariosFinais} (${tempoComentariosFinais})\n`;
        texto += `**Anúncios**: ${anuncios} (${tempoAnuncios})\n`;
        texto += `**Hora Fim**: ${horaFim}\n`;
        texto += `**Tempo Total**: ${tempoTotal}\n`;
    }
    else if (tipoReuniao === "mds") {
        const horaInicio = document.getElementById("horaInicio").value;
        const comentariosIniciais = document.getElementById("comentariosIniciais").value || "";
        const tempoComentariosIniciais = document.getElementById("tempoComentariosIniciais").value || "";
        const discurso = document.getElementById("discurso").value;
        const tempoDiscurso = document.getElementById("tempoDiscurso").value;
        const encontreJoias = document.getElementById("encontreJoias").value;
        const tempoEncontreJoias = document.getElementById("tempoEncontreJoias").value;
        const leituraBiblia = document.getElementById("leituraBiblia").value;
        const tempoLeituraBiblia = document.getElementById("tempoLeituraBiblia").value;
        const conselho1 = document.getElementById("conselho1").value;
        const tempoConselho1 = document.getElementById("tempoConselho1").value;
        const parte1 = document.getElementById("parte1").value;
        const tempoParte1 = document.getElementById("tempoParte1").value;
        const conselho2 = document.getElementById("conselho2").value;
        const tempoConselho2 = document.getElementById("tempoConselho2").value;
        const parte2 = document.getElementById("parte2").value;
        const tempoParte2 = document.getElementById("tempoParte2").value;
        const conselho3 = document.getElementById("conselho3").value;
        const tempoConselho3 = document.getElementById("tempoConselho3").value;
        const parte3 = document.getElementById("parte3").value;
        const tempoParte3 = document.getElementById("tempoParte3").value;
        const conselho4 = document.getElementById("conselho4").value;
        const tempoConselho4 = document.getElementById("tempoConselho4").value;
        const parte4 = document.getElementById("parte4").value;
        const tempoParte4 = document.getElementById("tempoParte4").value;
        const conselho5 = document.getElementById("conselho5").value;
        const tempoConselho5 = document.getElementById("tempoConselho5").value;
        const NvcParte1 = document.getElementById("NvcParte1").value;
        const tempoNvcParte1 = document.getElementById("tempoNvcParte1").value;
        const NvcParte2 = document.getElementById("NvcParte2").value;
        const tempoNvcParte2 = document.getElementById("tempoNvcParte2").value;
        const NvcParte3 = document.getElementById("NvcParte3").value;
        const tempoNvcParte3 = document.getElementById("tempoNvcParte3").value;
        const estudoBiblico = document.getElementById("estudoBiblico").value;
        const tempoEstudoBiblico = document.getElementById("tempoEstudoBiblico").value;
        const comentariosFinais = document.getElementById("comentariosFinais").value;
        const tempoComentariosFinais = document.getElementById("tempoComentariosFinais").value;
        const anuncios = document.getElementById("anuncios").value;
        const tempoAnuncios = document.getElementById("tempoAnuncios").value;
        const horaFim = document.getElementById("horaFim").value;
        const tempoTotal = document.getElementById("tempoTotal").value;

        texto += `**Hora Início**: ${horaInicio}\n`;
        texto += `**Comentários Iniciais**: ${comentariosIniciais} (${tempoComentariosIniciais})\n`;
        texto += `**Discurso**: ${discurso} (${tempoDiscurso})\n`;
        texto += `**Encontre Joias**: ${encontreJoias} (${tempoEncontreJoias})\n`;
        texto += `**Leitura Bíblia**: ${leituraBiblia} (${tempoLeituraBiblia})\n`;
        texto += `**Conselho 1**: ${conselho1} (${tempoConselho1})\n`;
        texto += `**Parte 1**: ${parte1} (${tempoParte1})\n`;
        texto += `**Conselho 2**: ${conselho2} (${tempoConselho2})\n`;
        texto += `**Parte 2**: ${parte2} (${tempoParte2})\n`;
        texto += `**Conselho 3**: ${conselho3} (${tempoConselho3})\n`;
        texto += `**Parte 3**: ${parte3} (${tempoParte3})\n`;
        texto += `**Conselho 4**: ${conselho4} (${tempoConselho4})\n`;
        texto += `**Parte 4**: ${parte4} (${tempoParte4})\n`;
        texto += `**Conselho 5**: ${conselho5} (${tempoConselho5})\n`;
        texto += `**Nvc Parte 1**: ${NvcParte1} (${tempoNvcParte1})\n`;
        texto += `**Nvc Parte 2**: ${NvcParte2} (${tempoNvcParte2})\n`;
        texto += `**Nvc Parte 3**: ${NvcParte3} (${tempoNvcParte3})\n`;
        texto += `**Estudo Bíblico**: ${estudoBiblico} (${tempoEstudoBiblico})\n`;
        texto += `**Comentários Finais**: ${comentariosFinais} (${tempoComentariosFinais})\n`;
        texto += `**Anúncios**: ${anuncios} (${tempoAnuncios})\n`;
        texto += `**Hora Fim**: ${horaFim}\n`;
        texto += `**Tempo Total**: ${tempoTotal}\n`;
    }

    navigator.clipboard.writeText(texto).then(() => {
        alert("Relatório copiado para a área de transferência!");
    }, (err) => {
        alert("Erro ao copiar o relatório: ", err);
    });
}