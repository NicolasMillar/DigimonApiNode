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
    try {
        const query = `SELECT * FROM cartas where booster = $1 and nombre like $2`;
        const cards = await db.any(query, [booster, `%${cardName}%`]);
        res.json(cards);
    } catch (error) {
        console.error('Error al obtener los datos de la tabla "cartas":', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos de la tabla "cartas"' });
    }
});


