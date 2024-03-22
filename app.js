require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors')
const port = process.env.PORT;


//coneccion a la base de datos;
const pgp = require('pg-promise')();
const connectionString = process.env.DB_URL; 
const db = pgp(connectionString);
app.use(cors())

app.use(express.json());
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

