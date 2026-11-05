// Script clássico carregado no <head>: redireciona antes de a página aparecer.
if (!localStorage.getItem("sessao")) {
    location.replace("/src/login.html");
}
