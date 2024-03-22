const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(PORT, () => {
  console.log(`La API está corriendo en http://localhost:${PORT}`);
});
