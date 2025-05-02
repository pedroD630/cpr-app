class Parte {
  constructor(quem, tempo) {
    this.quem = quem;
    this.tempo = tempo;
  }
}

function gerarPdfMds() {
  const horaInicio = document.getElementById("horaInicio").value;
  const comentInicial = new Parte(document.getElementById("comentariosIniciais").value, document.getElementById("tempoComentariosIniciais").value);
  const discurso = new Parte(document.getElementById("discurso").value, document.getElementById("tempoDiscurso").value);
  const encontreJoias = new Parte(document.getElementById("encontreJoias").value, document.getElementById("tempoEncontreJoias").value);
  const leituraBiblia = new Parte(document.getElementById("leituraBiblia").value, document.getElementById("tempoLeituraBiblia").value);
  const conselho1 = new Parte(document.getElementById("conselho1").value, document.getElementById("tempoConselho1").value);
  const parte1 = new Parte(document.getElementById("parte1").value, document.getElementById("tempoParte1").value);
  const conselho2 = new Parte(document.getElementById("conselho2").value, document.getElementById("tempoConselho2").value);
  const parte2 = new Parte(document.getElementById("parte2").value, document.getElementById("tempoParte2").value);
  const conselho3 = new Parte(document.getElementById("conselho3").value, document.getElementById("tempoConselho3").value);
  const parte3 = new Parte(document.getElementById("parte3").value, document.getElementById("tempoParte3").value);
  const conselho4 = new Parte(document.getElementById("conselho4").value, document.getElementById("tempoConselho4").value);
  const parte4 = new Parte(document.getElementById("parte4").value, document.getElementById("tempoParte4").value);
  const conselho5 = new Parte(document.getElementById("conselho1").value, document.getElementById("tempoConselho5").value);
  const NvcParte1 = new Parte(document.getElementById("NvcParte1").value, document.getElementById("tempoNvcParte1").value);
  const NvcParte2 = new Parte(document.getElementById("NvcParte2").value, document.getElementById("tempoNvcParte2").value);
  const NvcParte3 = new Parte(document.getElementById("NvcParte3").value, document.getElementById("tempoNvcParte3").value);
  const estudoBiblico = new Parte(document.getElementById("estudoBiblico").value, document.getElementById("tempoEstudoBiblico").value);
  const comentariosFinais = new Parte(document.getElementById("comentariosFinais").value, document.getElementById("tempoComentariosFinais").value);
  const anuncios = new Parte(document.getElementById("anuncios").value, document.getElementById("tempoAnuncios").value);
  const horaFim = document.getElementById("horaFim").value;
  const tempoTotal = document.getElementById("tempoTotal").value;

  var dd = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    content: [{
        text: 'Reunião Meio de Semana',
        style: 'subheader'
      },
      {
        style: 'tableExample',
        table: {
          widths: ['auto', 'auto'], // Define as larguras das colunas
          body: [
            [{
              text: 'Hora Início',
              fillColor: '#fbdcb0'
            }, `${horaInicio}`],
          ],
        },
      },
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['auto', 'auto', 'auto', 'auto'], // Larguras para 4 colunas
          headerRows: 1, // Define o número de linhas de cabeçalho
          body: [
            // Primeira linha com colSpan
            [{
                text: '',
                style: 'tableHeader',
                alignment: 'center'
              }, // Cabeçalho vazio
              {
                text: 'Parte',
                style: 'tableHeader',
                alignment: 'center'
              },
              {
                text: 'Tempo Gasto',
                style: 'tableHeader',
                alignment: 'center'
              },
              {
                text: 'Quem',
                style: 'tableHeader',
                alignment: 'center'
              }
            ],
            // Segunda linha de cabeçalho
            ['', {
              text: 'Comentários Iniciais',
              alignment: 'center'
            }, `${comentInicial.tempo}`, `${comentInicial.quem}`],
            // Corpo da tabela
            [{
                rowSpan: 4,
                text: 'Tesouros da Palavra de Deus',
                fillColor: '#cce5ff'
              },
              'Discurso (10 min.)',
              `${discurso.tempo}`,
              `${discurso.quem}`
            ],
            ['', 'Encontre Joias (10 min.)', `${encontreJoias.tempo}`, `${encontreJoias.quem}`],
            ['', 'Leitura da Bíblia (4 min.)', `${leituraBiblia.tempo}`, `${leituraBiblia.quem}`],
            ['', 'Conselho (1 min.)', `${conselho1.tempo}`, `${conselho1.quem}`],
            [{
                rowSpan: 8,
                text: 'Faça Seu Melhor no Ministério',
                fillColor: '#ffda9e'
              },
              '1° Parte',
              `${parte1.tempo}`,
              `${parte1.quem}`
            ],
            ['', 'Conselho (1 min.)', `${conselho2.tempo}`, `${conselho2.quem}`],
            ['', '2° Parte', `${parte2.tempo}`, `${parte2.quem}`],
            ['', 'Conselho (1 min.)', `${conselho3.tempo}`, `${conselho3.quem}`],
            ['', '3° Parte', `${parte3.tempo}`, `${parte3.quem}`],
            ['', 'Conselho (1 min.)', `${conselho4.tempo}`, `${conselho4.quem}`],
            ['', '4° Parte', `${parte4.tempo}`, `${parte4.quem}`],
            ['', 'Conselho (1 min.)', `${conselho5.tempo}`, `${conselho5.quem}`],
            [{
                rowSpan: 4,
                text: 'Nossa Vida Cristã',
                fillColor: '#fcb7af'
              },
              '1° Parte',
              `${NvcParte1.tempo}`,
              `${NvcParte1.quem}`
            ],
            ['', '2° Parte', `${NvcParte2.tempo}`, `${NvcParte2.quem}`],
            ['', '3° Parte', `${NvcParte3.tempo}`, `${NvcParte3.quem}`],
            ['', 'Estudo Bíblico', `${estudoBiblico.tempo}`, `${estudoBiblico.quem}`],

            ['', 'Comentários Finais', `${comentariosFinais.tempo}`, `${comentariosFinais.quem}`],
            ['', 'Anúncios', `${anuncios.tempo}`, `${anuncios.quem}`],
          ],
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: ['auto', 'auto', 'auto', 'auto'], // Define as larguras das colunas
          body: [
            [{
              text: 'Hora Fim',
              fillColor: '#fbdcb0'
            }, `${horaFim}`, {
              text: 'Tempo Total',
              fillColor: '#a4d9a3'
            }, `${tempoTotal}`]
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
        alignment: 'center',
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  pdfMake.createPdf(dd).download('reuniaomds.pdf');
}

function gerarPdfFds() {
  const horaInicio = document.getElementById("horaInicio").value;
  const comentInicial = new Parte(document.getElementById("comentariosIniciais").value, document.getElementById("tempoComentariosIniciais").value);
  const discursoPublico = new Parte(document.getElementById("discursoPublico").value, document.getElementById("tempoDiscursoPublico").value);
  const estudoSentinela = new Parte(document.getElementById("estudoSentinela").value, document.getElementById("tempoEstudoSentinela").value);
  const comentariosFinais = new Parte(document.getElementById("comentariosFinais").value, document.getElementById("tempoComentariosFinais").value);
  const anuncios = new Parte(document.getElementById("anuncios").value, document.getElementById("tempoAnuncios").value);
  const horaFim = document.getElementById("horaFim").value;
  const tempoTotal = document.getElementById("tempoTotal").value;

  var fds = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    content: [{
        text: 'Reunião Fim de Semana',
        style: 'subheader'
      },
      {
        style: 'tableExample',
        table: {
          widths: ['auto', 'auto'], // Define as larguras das colunas
          body: [
            [{
              text: 'Hora Início',
              fillColor: '#fbdcb0'
            }, `${horaInicio}`],
          ],
        },
      },
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['auto', 'auto', 'auto'], // Larguras para 4 colunas
          headerRows: 1, // Define o número de linhas de cabeçalho
          body: [
            // Primeira linha com colSpan
            [{
                text: '',
                style: 'tableHeader',
                alignment: 'center'
              }, // Cabeçalho vazio
              {
                text: 'Tempo Gasto',
                style: 'tableHeader',
                alignment: 'center'
              },
              {
                text: 'Quem',
                style: 'tableHeader',
                alignment: 'center'
              }
            ],
            // Segunda linha de cabeçalho
            ['Comentários Iniciais', `${comentInicial.tempo}`, `${comentInicial.quem}`],
            // Corpo da tabela
            ['Discurso Público', `${discursoPublico.tempo}`, `${discursoPublico.quem}`],
            ['Estudo de A Sentinela', `${estudoSentinela.tempo}`, `${estudoSentinela.quem}`],

            ['Comentários Finais', `${comentariosFinais.tempo}`, `${comentariosFinais.quem}`],
            ['Anúncios', `${anuncios.tempo}`, `${anuncios.quem}`],
          ],
        },
      },
      {
        style: 'tableExample',
        table: {
          widths: ['auto', 'auto', 'auto', 'auto'], // Define as larguras das colunas
          body: [
            [{
              text: 'Hora Fim',
              fillColor: '#fbdcb0'
            }, `${horaFim}`, {
              text: 'Tempo Total',
              fillColor: '#a4d9a3'
            }, `${tempoTotal}`]
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
        alignment: 'center',
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  pdfMake.createPdf(fds).download('reuniaofds.pdf');
}

export function gerarPdfRelatorio(tipoReuniao) {
  if (tipoReuniao == "fds") {
    gerarPdfFds();
  } else {
    gerarPdfMds();
  }
}