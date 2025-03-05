// Carrega o menu HTML dinamicamente
export function carregarMenu(baseUrl) {
    fetch(`${baseUrl}src/reutil/menu-inf.html`)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ao carregar menu: ${response.statusText}`);
            return response.text(); // Converte o conteúdo para texto
        })
        .then(menuHTML => {
            document.getElementById('menu').innerHTML = menuHTML;
        })
        .catch(error => {
            console.error('Erro ao carregar o menu:', error);
        });
}

export function carregarCronometro(baseUrl) {
    fetch(`${baseUrl}src/reutil/cronometro.html`)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ao carregar cronometro: ${response.statusText}`);
            return response.text();
        })
        .then(menuHTML => {
            document.getElementById('cronometro').innerHTML = menuHTML;
        })
        .catch(error => {
            console.error('Erro ao carregar o cronometro:', error);
        });
}