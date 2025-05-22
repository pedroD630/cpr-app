import {
    updateDisplay
} from "./ui.js";
import {
    getParteIniciada,
    startParte
} from "./cronometro-partes.js";

let cron;
let startTime;
let elapsedTime = 0;
let reuniaoIniciada = false;
let reuniaoPausada = false;

export function setReuniaoIniciada(valor) {
    reuniaoIniciada = valor;
}

export function getReuniaoIniciada() {
    return reuniaoIniciada;
}

export function setReuniaoPausada(valor) {
    reuniaoPausada = valor;
}

export function getReuniaoPausada() {
    return reuniaoPausada;
}

export function startCron() {
    startTime = Date.now() - elapsedTime;
    cron = requestAnimationFrame(timer);

    if (getParteIniciada()) {
        startParte();
    }
}

export function pauseCron() {
    cancelAnimationFrame(cron); // Para o loop
    elapsedTime = Date.now() - startTime; // Salva o tempo decorrido
}

export function resetCron() {
    pauseCron();
    elapsedTime = 0;
    updateDisplay(0, 0, 0); // Atualiza para 00:00:00
}

export function timer() {
    const now = Date.now(); // Tempo atual em milissegundos
    const diff = now - startTime; // Tempo total decorrido

    const hour = Math.floor(diff / 3600000);
    const minute = Math.floor((diff % 3600000) / 60000);
    const second = Math.floor((diff % 60000) / 1000);

    updateDisplay(hour, minute, second); // Atualiza o display
    cron = requestAnimationFrame(timer); // Continua o loop
}