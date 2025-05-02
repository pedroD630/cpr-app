import {
    returnData
} from "./utils.js";

let cronParte;
let pStartTime;
let pElapsedTime = 0;
let pHour = 0;
let pMinute = 0;
let pSecond = 0;
let pMillisecond = 0;
let parteAtual = 0;
export let temposPartes = [];
let parteIniciada = false;

export function getPHour() {
    return pHour;
}

export function getPMinute() {
    return pMinute;
}

export function getPSecond() {
    return pSecond;
}

export function getPMillisecond() {
    return pMillisecond;
}

export function setPHour(value) {
    pHour = value;
}

export function setPMinute(value) {
    pMinute = value;
}

export function setPSecond(value) {
    pSecond = value;
}

export function setPMillisecond(value) {
    pMillisecond = value;
}

export function setParteIniciada(valor) {
    parteIniciada = valor;
}

export function getParteIniciada() {
    return parteIniciada;
}

export function setParteAtual(valor) {
    parteAtual = valor;
}

export function getParteAtual() {
    return parteAtual;
}

export function startParte() {
    pStartTime = Date.now() - pElapsedTime;
    cronParte = requestAnimationFrame(timerParte);
}

export function pauseParte() {
    cancelAnimationFrame(cronParte); // Para o loop
    pElapsedTime = Date.now() - pStartTime; // Salva o tempo decorrido
}

export function resetParte() {
    pauseParte();
    pElapsedTime = 0;
    document.getElementById('displayParte').innerText = '00:00:00';
}

export function timerParte() {
    const now = Date.now(); // Tempo atual em milissegundos
    const diff = now - pStartTime; // Tempo total decorrido

    pHour = Math.floor(diff / 3600000);
    pMinute = Math.floor((diff % 3600000) / 60000);
    pSecond = Math.floor((diff % 60000) / 1000);

    cronParte = requestAnimationFrame(timerParte); // Continua o loop

    const formattedPHour = returnData(pHour);
    const formattedPMinute = returnData(pMinute);
    const formattedPSecond = returnData(pSecond);

    if (parteAtual < temposPartes.length) {
        if (pHour > 0) {
            temposPartes[parteAtual].value = `${formattedPHour}:${formattedPMinute}:${formattedPSecond}`;
        } else {
            temposPartes[parteAtual].value = `${formattedPMinute}:${formattedPSecond}`;
        }

    }

    document.getElementById('displayParte').innerText = `${formattedPHour}:${formattedPMinute}:${formattedPSecond}`;

}