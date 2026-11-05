// Script clássico carregado no <head>: o tema precisa ser definido antes da
// primeira pintura para a página não piscar no tema errado.
const temaSistema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

document.documentElement.setAttribute("data-bs-theme", temaSistema);
