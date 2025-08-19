// Carrega o menu HTML dinamicamente
import { 
    storeTempo, 
    storeHora 
} from "./salvar-local.js";

import {
    returnData,
    baseUrl
} from "./utils.js";

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

export function carregarRelPorData() {
    const diasFimDeSemana = [5, 6, 0];
    const dataAtual = new Date();
    const diaHoje = dataAtual.getDay();

    if (diasFimDeSemana.includes(diaHoje)) {
        window.location.href = `${baseUrl}src/relatorios/fds.html`;
    } else {
        window.location.href = `${baseUrl}src/relatorios/mds.html`;
    }
}

export function updateDisplay(hour, minute, second) {
    const formattedHour = returnData(hour);
    const formattedMinute = returnData(minute);
    const formattedSecond = returnData(second);

    document.getElementById('displayTime').innerText = `${formattedHour}:${formattedMinute}:${formattedSecond}`;
}

//parametros: temposPartes, index, pHour, pMinute, pSecond
export function preencherTempo(temposPartes, index, pHour, pMinute, pSecond) {
    const parteTempo = temposPartes[index];
    const formattedPHour = returnData(pHour);
    const formattedPMinute = returnData(pMinute);
    const formattedPSecond = returnData(pSecond);

    if (pHour > 0) {
        parteTempo.value = `${formattedPHour}:${formattedPMinute}:${formattedPSecond}`;
    } else {
        parteTempo.value = `${formattedPMinute}:${formattedPSecond}`;
    }

    storeTempo(index, parteTempo.value);
    storeHora("tempoTotal", document.getElementById("displayTime").textContent);
}

export function preencherTempoTotal() {
    let tempoTotal = document.getElementById("tempoTotal");
    tempoTotal.value = document.getElementById("displayTime").textContent;
}