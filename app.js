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

app.get('/cards', async (req, res) => {
    const { booster, cardName } = req.query;
    let query = `SELECT * FROM cartas`;
    const conditions = [];
    const values = [];

    // Agregar condiciones según los parámetros proporcionados
    if (booster) {
        conditions.push(`booster = $${conditions.length + 1}`);
        values.push(booster);
    }
    if (cardName) {
        conditions.push(`nombre ILIKE $${conditions.length + 1}`);
        values.push(`%${cardName}%`);
    }

    // Si hay al menos una condición, añadirla a la consulta
    if (conditions.length) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    //entrega los resultados de la consulta o arroja un error en caso de ser necesario
    try {
        const cards = await db.any(query, values);
        res.json(cards);
    } catch (error) {
        console.error('Error al obtener los datos de la tabla "cartas":', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos de la tabla "cartas"' });
    }
});


