async function enviar() {
  const personaje = document.getElementById("personaje").value;
  const pregunta = document.getElementById("pregunta").value;

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ personajeId: personaje, pregunta })
  });

  const data = await res.json();
document.getElementById("respuesta").textContent = data.respuesta;
hablar(data.respuesta);
}

