const baseUrl = "https://pedrod630.github.io/kairos-manager-app/";
// Carrega o menu HTML dinamicamente
fetch('/kairos-manager-app/src/reutil/menu-inf.html')
  .then(response => {
    if (!response.ok) throw new Error(`Erro ao carregar menu: ${response.statusText}`);
    return response.text(); // Converte o conteúdo para texto
  })
  .then(menuHTML => {
    document.getElementById('menu').innerHTML = menuHTML; // Insere o menu no elemento com id="menu"
  })
  .catch(error => {
    console.error('Erro ao carregar o menu:', error); // Exibe o erro no console
  });

function selecionarRelPorData() {
  const diasFimDeSemana = [5, 6, 0];
  const dataAtual = new Date();
  const diaHoje = dataAtual.getDay();

  if (diasFimDeSemana.includes(diaHoje)) {
    window.location.href = `${baseUrl}src/relatorios/fds.html`;
  } else {
    window.location.href = `${baseUrl}src/relatorios/mds.html`;
  }
}
