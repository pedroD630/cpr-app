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