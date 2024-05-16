let is24HourFormat = true;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // Verifica se o formato é de 12h e ajusta as horas
  if (!is24HourFormat) {
    let suffix = hours >= 12 ? " PM" : " AM";
    hours = ((hours + 11) % 12) + 1; // Converte 0 para 12 para AM
    document.getElementById("hours").textContent =
      hours.toString().padStart(2, "0") + suffix;
  } else {
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
  }

  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  // Atualiza a data
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  document.getElementById("date").textContent = `${day}/${month}/${year}`;
}

setInterval(updateClock, 1000);

// Função para alternar o formato do relógio
document.getElementById("toggleFormat").addEventListener("click", function () {
  is24HourFormat = !is24HourFormat;
  this.textContent = is24HourFormat ? "Alterar para 12h" : "Alterar para 24h";
});

let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;

function updateStopwatch() {
  const hours = Math.floor(stopwatchTime / 3600);
  const minutes = Math.floor((stopwatchTime % 3600) / 60);
  const seconds = stopwatchTime % 60;

  document.getElementById("stopwatchTime").textContent = `${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

document.getElementById("startStopBtn").addEventListener("click", function () {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatch();
    }, 1000);
    this.textContent = "Parar";
    stopwatchRunning = true;
  } else {
    clearInterval(stopwatchInterval);
    this.textContent = "Iniciar";
    stopwatchRunning = false;
  }
});

document.getElementById("resetBtn").addEventListener("click", function () {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatch();
  document.getElementById("startStopBtn").textContent = "Iniciar";
  stopwatchRunning = false;
});

// Initialize stopwatch display
updateStopwatch();

let alarmTime = null;
let alarmTimeout = null;

document.getElementById("setAlarm").addEventListener("click", () => {
  alarmTime = document.getElementById("alarmTime").value;
  alert(`Alarme configurado para as ${alarmTime}`);
});

document.getElementById("cancelAlarm").addEventListener("click", () => {
  alarmTime = null;
  clearTimeout(alarmTimeout);
  alert("Alarme cancelado.");
});

function checkAlarm() {
  const currentTime = new Date();
  const currentHours = currentTime.getHours().toString().padStart(2, "0");
  const currentMinutes = currentTime.getMinutes().toString().padStart(2, "0");
  if (`${currentHours}:${currentMinutes}` === alarmTime) {
    alert("Alarme! O horário configurado chegou.");

    alarmTime = null;
  }
}

setInterval(checkAlarm, 1000);
