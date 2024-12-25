const baseUrl = "/";
let cron;
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cronParte;
let pHour = 0;
let pMinute = 0;
let pSecond = 0;
let pMillisecond = 0;
let parteAtual = 0;
let temposPartes;

let reuniaoIniciada = false;
let parteIniciada = false;

// Carrega o menu HTML dinamicamente
fetch(`${baseUrl}src/reutil/menu-inf.html`)
  .then(response => {
    if (!response.ok) throw new Error(`Erro ao carregar menu: ${response.statusText}`);
    return response.text(); // Converte o conteúdo para texto
  })
  .then(menuHTML => {
    document.getElementById('menu').innerHTML = menuHTML; // Insere o menu no elemento com id="menu"
  })
  .catch(error => {
    console.error('Erro ao carregar o menu:', error); // Exibe o erro no console
  });

fetch(`${baseUrl}src/reutil/cronometro.html`)
  .then(response => {
    if (!response.ok) throw new Error(`Erro ao carregar cronometro: ${response.statusText}`);
    return response.text(); // Converte o conteúdo para texto
  })
  .then(menuHTML => {
    document.getElementById('cronometro').innerHTML = menuHTML; // Insere o menu no elemento com id="menu"
  })
  .catch(error => {
    console.error('Erro ao carregar o cronometro:', error); // Exibe o erro no console
  });

function selecionarRelPorData() {
  const diasFimDeSemana = [5, 6, 0];
  const dataAtual = new Date();
  const diaHoje = dataAtual.getDay();

  if (diasFimDeSemana.includes(diaHoje)) {
    window.location.href = `${baseUrl}src/relatorios/fds.html`;
  } else {
    window.location.href = `${baseUrl}src/relatorios/mds.html`;
  }
}

function receberHorario(){
  let date = new Date();
  let horas = date.getHours();
  let minutos = date.getMinutes();

  let horasFormatada = horas.toString().padStart(2, '0');
  let minutosFormatado = minutos.toString().padStart(2, '0');

  return `${horasFormatada}:${minutosFormatado}`;
}

function startCron() {
  pauseCron();
  cron = setInterval(() => { timer(); }, 10);

  if(parteIniciada){
    startParte();
  }
}

function pauseCron() {
  clearInterval(cron);
  clearInterval(cronParte);
}

function resetCron() {
  clearInterval(cron);
  hour = 0;
  minute = 0;        
  second = 0;    
  millisecond = 0;
  document.getElementById('displayTime').innerText = '00:00:00';
}

function timer() {
  if ((millisecond += 10) === 1000) {
    millisecond = 0;
    second++;
  }
  if (second === 60) {
    second = 0;
    minute++;
  }
  if (minute === 60) {
    minute = 0;
    hour++;
  }

  const formattedHour = returnData(hour);
  const formattedMinute = returnData(minute);
  const formattedSecond = returnData(second);

  document.getElementById('displayTime').innerText = `${formattedHour}:${formattedMinute}:${formattedSecond}`;
}

function startParte() {
  clearInterval(cronParte);
  cronParte = setInterval(() => { timerParte(); }, 10);
}

function resetParte() {
  clearInterval(cronParte);
  pHour = 0;
  pMinute = 0;        
  pSecond = 0;    
  pMillisecond = 0;
  document.getElementById('displayParte').innerText = '00:00:00';
}

function timerParte() {
  if ((pMillisecond += 10) === 1000) {
    pMillisecond = 0;
    pSecond++;
  }
  if (pSecond === 60) {
    pSecond = 0;
    pMinute++;
  }
  if (pMinute === 60) {
    pMinute = 0;
    pHour++;
  }

  const formattedPHour = returnData(pHour);
  const formattedPMinute = returnData(pMinute);
  const formattedPSecond = returnData(pSecond);

  if (parteAtual < temposPartes.length) {
    if(pHour > 0) {
      temposPartes[parteAtual].value = `${formattedPHour}:${formattedPMinute}:${formattedPSecond}`;
    }
    else {
      temposPartes[parteAtual].value = `${formattedPMinute}:${formattedPSecond}`;
    }
    
  }

  document.getElementById('displayParte').innerText = `${formattedPHour}:${formattedPMinute}:${formattedPSecond}`;

}

function preencherTempo(index) {
  const parteTempo = temposPartes[index];
  const formattedPHour = returnData(pHour);
  const formattedPMinute = returnData(pMinute);
  const formattedPSecond = returnData(pSecond);

  if(pHour > 0){
    parteTempo.value = `${formattedPHour}:${formattedPMinute}:${formattedPSecond}`;
  }
  else {
    parteTempo.value = `${formattedPMinute}:${formattedPSecond}`;
  }
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`
}

function preencherTempoTotal() {
  let tempoTotal = document.getElementById("tempoTotal");
  tempoTotal.value = document.getElementById("displayTime").textContent;
}

document.addEventListener("DOMContentLoaded", () =>{

  temposPartes = document.querySelectorAll(".tempo-parte");

  document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "hideTimer") {
      let timerNavbar = document.getElementById("cronometro");
      timerNavbar.classList.toggle("hidden");
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "startMeeting") {

      if(!reuniaoIniciada){
        let horaInicio = document.getElementById("horaInicio");
        horaInicio.value = receberHorario();
        reuniaoIniciada = true;
      }

      startCron();
    }

    if (event.target && event.target.id === "encerrarReuniao") {
      event.preventDefault();
      let horaFim = document.getElementById("horaFim");
      horaFim.value = receberHorario();

      preencherTempoTotal();
      resetCron();

      reuniaoIniciada = false;

      if(parteIniciada){
        parteIniciada = false;
        preencherTempo(parteAtual);
        parteAtual = 0;
        resetParte();
      }
    }

    if (event.target && event.target.id === "pauseMeeting") {
      pauseCron();
    }

    if (event.target && event.target.id === "startParte") {

      if(reuniaoIniciada){
        if(!parteIniciada){
          parteIniciada = true;
        }
  
        startParte();
      }
      else {alert("Reunião não iniciada!")}
    }

    if (event.target && event.target.id === "endParte") {
      parteIniciada = false;
      preencherTempo(parteAtual);
      parteAtual++;
      resetParte();
    }
  });
});