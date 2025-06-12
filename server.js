const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const personajes = require('./personajes.json');

app.post('/chat', async (req, res) => {
  const { personajeId, pregunta } = req.body;
  const personaje = personajes[personajeId];

  if (!personaje) return res.status(404).send("Personaje no encontrado.");

  const prompt = fs.readFileSync(`./ollama/personajes/${personajeId}.txt`, 'utf-8');
  const fullPrompt = `${prompt}\n\nUsuario: ${pregunta}\n${personaje.nombre}:`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify({
      model: "mistral",
      prompt: fullPrompt,
      stream: false
    }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();
  res.json({ respuesta: data.response });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
