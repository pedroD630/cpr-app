import {
  carregarCronometro,
  carregarMenu,
  preencherTempo,
  preencherTempoTotal,
  carregarRelPorData
} from "./ui.js";
import {
  receberHorario,
  baseUrl
} from "./utils.js";
import {
  startCron,
  pauseCron,
  resetCron,
  getReuniaoPausada,
  setReuniaoPausada,
  getReuniaoIniciada,
  setReuniaoIniciada
} from "./cronometro-geral.js";
import {
  startParte,
  pauseParte,
  resetParte,
  timerParte,
  temposPartes,
  getParteIniciada,
  setParteIniciada,
  setParteAtual,
  getParteAtual,
  getPHour,
  getPMinute, 
  getPSecond,
} from "./cronometro-partes.js";
import {
  gerarPdfRelatorio
} from "./gerar-pdf.js";

carregarCronometro(baseUrl);
carregarMenu(baseUrl);

function encerrarParte() {
  setParteIniciada(false);
  preencherTempo(temposPartes, getParteAtual(), getPHour(), getPMinute(), getPSecond());
  setParteAtual(getParteAtual() + 1);
  resetParte();
}

document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener('beforeunload', (event) => {
    if (getReuniaoIniciada()) {
      event.preventDefault();
      event.returnValue = '';
    }
  });

  document.querySelectorAll(".tempo-parte").forEach(el => temposPartes.push(el));

  document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "hideTimer") {
      let timerNavbar = document.getElementById("cronometro");
      timerNavbar.classList.toggle("hidden");
    }
  });

  document.addEventListener("click", (event) => {

    const startButton = event.target.closest("#startMeeting");
    if (startButton) {
      if (!getReuniaoIniciada()) {
        let horaInicio = document.getElementById("horaInicio");
        horaInicio.value = receberHorario();
        setReuniaoIniciada(true);
        startCron();
      } else if (getReuniaoPausada) {
        setReuniaoPausada(false);
        startCron();
      }
    }

    const endButton = event.target.closest("#encerrarReuniao");
    if (endButton) {
      event.preventDefault();
      let horaFim = document.getElementById("horaFim");
      horaFim.value = receberHorario();

      preencherTempoTotal();
      resetCron();

      setReuniaoIniciada(false)

      if (getParteIniciada()) {
        setParteIniciada(false);
        preencherTempo(temposPartes, getParteAtual(), getPHour(), getPMinute(), getPSecond());
        setParteAtual(0);
        resetParte();
      }
    }

    const relatButton = event.target.closest("#gerarRelatorio")
    if (relatButton) {
      event.preventDefault();
      if(!getReuniaoIniciada()){
        gerarPdfRelatorio(tipoReuniao);
      } else {
        alert("Reunião não foi encerrada");
      }
      
    }

    const pauseButton = event.target.closest("#pauseMeeting")
    if (pauseButton) {
      setReuniaoPausada(true);
      pauseCron();
      pauseParte();
    }

    const startPButton = event.target.closest("#startParte")
    if (startPButton) {

      if (getReuniaoIniciada() && !getReuniaoPausada()) {
        if (!getParteIniciada()) {
          setParteIniciada(true);
          startParte();
        }
      } else {
        alert("Reunião não iniciada!")
      }
    }

    const endPButton = event.target.closest("#endParte")
    if (endPButton) {
      if(!getParteIniciada()){
        alert("Parte não iniciada!")
      }
      else {
        encerrarParte();
      }
    }

    const nextPButton = event.target.closest("#nextParte")
    if(nextPButton) {
      if(!getParteIniciada()){
        preencherTempo(temposPartes, getParteAtual(), 0, 0, 0);
        setParteAtual(getParteAtual() + 1);
        resetParte();
      } 
      else {
        encerrarParte();
      }
    }

    const backPButton = event.target.closest("#lastParte")
    if(backPButton) {
        setParteIniciada(false);
        preencherTempo(temposPartes, getParteAtual(), getPHour(), getPMinute(), getPSecond());
        setParteAtual(getParteAtual() - 1);
        resetParte();
    }
  });
});
window.carregarRelPorData = carregarRelPorData;