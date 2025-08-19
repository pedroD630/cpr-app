import {
  carregarCronometro,
  carregarMenu,
  preencherTempo,
  preencherTempoTotal,
  carregarRelPorData
} from "./ui.js";
import {
  receberHorario,
  baseUrl,
  parseTempo
} from "./utils.js";
import {
  startCron,
  pauseCron,
  resetCron,
  carregarEstadoCronometro,
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
import { 
  storeHora, 
  getTempo, 
  limparStorage
} from "./salvar-local.js";

carregarMenu(baseUrl);

function encerrarParte() {
  setParteIniciada(false);
  preencherTempo(temposPartes, getParteAtual(), getPHour(), getPMinute(), getPSecond());
  setParteAtual(getParteAtual() + 1);
  resetParte();
}

document.addEventListener("DOMContentLoaded", async () => {
  await carregarCronometro(baseUrl);
  document.querySelectorAll(".tempo-parte").forEach(el => temposPartes.push(el));

  if(getTempo("reuniaoIniciada")){
    carregarEstadoCronometro();
    let proxParte = getTempo("proxParte");

    let horaInicio = document.getElementById("horaInicio");
    horaInicio.value = getTempo("horaInicio");

    for(let i = getParteAtual(); i < proxParte; i++){
      let tempoParte = getTempo(i);
      let tempoParteObj = parseTempo(tempoParte);
      preencherTempo(temposPartes, i, tempoParteObj.horas, tempoParteObj.minutos, tempoParteObj.segundos);
      setParteAtual(getParteAtual() + 1);
    }
  }

  window.addEventListener('beforeunload', (event) => {
    if (getReuniaoIniciada()) {
      event.preventDefault();
      event.returnValue = '';
    }
  });

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
        storeHora("horaInicio", horaInicio.value);
        setReuniaoIniciada(true);
        startCron();
      } else if (getReuniaoPausada()) {
        setReuniaoPausada(false);
        startCron();
      } else if (getReuniaoIniciada() && !getReuniaoPausada()) {
        alert("Reunião já iniciada");
      }
    }

    const endButton = event.target.closest("#encerrarReuniao");
    if (endButton) {
      event.preventDefault();
      let horaFim = document.getElementById("horaFim");
      horaFim.value = receberHorario();
      storeHora("horaFim", horaFim.value);

      preencherTempoTotal();
      storeHora("tempoTotal", document.getElementById("displayTime").textContent);
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
      limparStorage()
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
      if(getReuniaoIniciada()) {
        if((getParteAtual() == 18 && tipoReuniao == "mds") || (getParteAtual() == 4 && tipoReuniao == "fds")){
          alert("Última parte alcançada. Não é possível avançar");
        } else {
            if(!getParteIniciada()) {
            preencherTempo(temposPartes, getParteAtual(), 0, 0, 0);
            setParteAtual(getParteAtual() + 1);
            resetParte();
          } 
          else {
            encerrarParte();
          }
        }
      } else {
        alert("Inicie a reunião para navegar");
      }
    }

    const backPButton = event.target.closest("#lastParte")
    if(backPButton) {
      if(getReuniaoIniciada()) {
        if(getParteAtual() == 0) {
          alert("Primeira parte localizada, não é possível voltar.");
        } else {
          setParteIniciada(false);
          preencherTempo(temposPartes, getParteAtual(), getPHour(), getPMinute(), getPSecond());
          setParteAtual(getParteAtual() - 1);
          resetParte();
        }
      } else {
        alert("Inicie a reunião para navegar");
      }
    }
  });
});
window.carregarRelPorData = carregarRelPorData;