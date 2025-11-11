// index.js
import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log('✅ Connesso al database!'))
    .catch(err => console.error('❌ Errore di connessione:', err));

app.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT NOW() AS now');
        res.json({ status: 'ok', time: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore nella query' });
    }
});

app.listen(port, () => console.log(`Server in ascolto su porta ${port}`));
