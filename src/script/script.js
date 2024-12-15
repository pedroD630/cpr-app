// Carrega o menu HTML dinamicamente
fetch('/src/reutil/menu-inf.html')
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