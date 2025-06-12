const micButton = document.getElementById('micButton');
const preguntaInput = document.getElementById('pregunta');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener('click', () => {
        recognition.start();
        micButton.innerText = '🎤...';
        micButton.disabled = true;
    });

    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        preguntaInput.value = transcript;
    });

    recognition.addEventListener('end', () => {
        micButton.innerText = '🎤';
        micButton.disabled = false;
    });

    recognition.addEventListener('error', (event) => {
        console.error('Error de reconocimiento de voz:', event.error);
        micButton.innerText = '🎤';
        micButton.disabled = false;
    });
} else {
    micButton.disabled = true;
    micButton.innerText = '❌';
    micButton.title = 'Reconocimiento de voz no soportado en este navegador';
}

// Diccionario de personajes con voz asignada
const vocesPorPersonaje = {
    azurduy: "Spanish Latin American Female",
    sucre: "Spanish Latin American Male",
    santa_cruz: "Spanish Latin American Male",
    bolivar: "Spanish Latin American Male",
    villarroel: "Spanish Latin American Male"
};

// Función para hablar el texto con la voz adecuada
function hablar(texto) {
    const personaje = document.getElementById('personaje').value;
    const voz = vocesPorPersonaje[personaje] || "Spanish Latin American Female";

    responsiveVoice.speak(texto, voz, {
        rate: 1,
        pitch: personaje === "azurduy" ? 1.0 : 1.0,
        volume: 1
    });
}