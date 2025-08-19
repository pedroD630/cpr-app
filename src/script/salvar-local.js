// declarar uma função que salva itens no localstorage
// declarar função que recebe o item x, verifica se exixte no local storage. Se existir retorna  o valor, se não, false
// partes vão ficar salvas com nome sendo o numero da parte, e o tempo


export function storeTempo(index, tempo){
    localStorage.setItem(index, tempo);
    localStorage.setItem('proxParte', `${index + 1}`);
}

export function storeHora(campo, hora){
    localStorage.setItem(campo, hora);
}

export function getTempo(campo){
    if(localStorage.getItem(`${campo}`) === null){
        return(false);
    }

    return localStorage.getItem(`${campo}`);
}

export function limparStorage(){
    console.log("Limpando storage...");
    localStorage.clear();
    console.log(localStorage.length);
}