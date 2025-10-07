/*
* Script para el contador de urgencia. 
* Este script define un temporizador que se reinicia cada 24 horas 
* para crear un sentido de urgencia en la p�gina de ventas.
*/

// ID del elemento donde se muestra el contador
const countdownElement = document.getElementById('countdown');

// Llave para guardar la hora de finalizaci�n en el navegador
const expiryKey = 'countdownExpiry';

// Duraci�n del temporizador en horas (24 horas)
const durationHours = 24;

/**
 * Funci�n que actualiza el contador cada segundo.
 */
function updateCountdown() {
    // 1. Obtener la hora de finalizaci�n guardada
    let expiryTime = localStorage.getItem(expiryKey);
    let now = new Date().getTime();

    // 2. Si no hay hora de finalizaci�n o ya expir�, establece una nueva hora (reinicia el ciclo)
    if (!expiryTime || now > parseInt(expiryTime)) {
        let newExpiryTime = now + (durationHours * 60 * 60 * 1000);
        localStorage.setItem(expiryKey, newExpiryTime);
        expiryTime = newExpiryTime;
    }

    // 3. Calcular el tiempo restante
    let distance = parseInt(expiryTime) - now;

    // C�lculo de tiempo para horas, minutos y segundos
    let hours = Math.floor((distance % (1000 * 60 * 60 * durationHours)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Formatear para que siempre tenga dos d�gitos
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    // Mostrar el resultado en el elemento HTML
    countdownElement.innerHTML = hours + "h : " + minutes + "m : " + seconds + "s";

    // Si el contador termina (deber�a reiniciarse antes de llegar aqu�, pero como seguridad)
    if (distance < 0) {
        countdownElement.innerHTML = "�Oferta Expirada!";
    }
}

// Iniciar el contador inmediatamente y configurarlo para que se actualice cada segundo
window.onload = function() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
