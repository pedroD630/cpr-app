export const baseUrl = "/";

export function receberHorario() {
    let date = new Date();
    let horas = date.getHours();
    let minutos = date.getMinutes();

    let horasFormatada = horas.toString().padStart(2, '0');
    let minutosFormatado = minutos.toString().padStart(2, '0');

    return `${horasFormatada}:${minutosFormatado}`;
}

export function returnData(input) {
    return input < 10 ? `0${input}` : input;
}

// converte o tempo de strings para um objeto com horas, minutos e segundos
export function parseTempo(tempoStr) {
  if (!tempoStr) return { horas: false, minutos: 0, segundos: 0 };

  let partes = tempoStr.split(":").map(Number);

  let horas = 0;
  let minutos = 0;
  let segundos = 0;

  if (partes.length === 2) {
    minutos = partes[0];
    segundos = partes[1];
  } else if (partes.length === 3) {
    // formato HH:MM:SS
    horas = partes[0];
    minutos = partes[1];
    segundos = partes[2];
  }

  return { horas, minutos, segundos };
}