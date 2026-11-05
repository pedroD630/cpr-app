// Script clássico carregado no <head>: o tema precisa ser definido antes da
// primeira pintura para a página não piscar no tema errado.
const temaSistema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const temaSalvo = localStorage.getItem("tema");

document.documentElement.setAttribute("data-bs-theme", temaSalvo || temaSistema);

document.addEventListener("click", (event) => {
    if (!event.target.closest("#alternarTema")) return;

    const temaAtual = document.documentElement.getAttribute("data-bs-theme");
    const novoTema = temaAtual === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-bs-theme", novoTema);
    localStorage.setItem("tema", novoTema);
});
