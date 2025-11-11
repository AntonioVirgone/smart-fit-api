import express from 'express';
import { pool } from './db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ Crea tabella se non esiste
const createTable = async () => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
};
createTable().then(() => console.log("✅ Tabella 'users' pronta!"));

// 🟢 CREATE (POST /users)
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore nella creazione utente' });
    }
});

// 🔵 READ ALL (GET /users)
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore nel recupero utenti' });
    }
});

// 🟣 READ ONE (GET /users/:id)
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore nel recupero utente' });
    }
});

// 🟠 UPDATE (PUT /users/:id)
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore nell\'aggiornamento utente' });
    }
});

// 🔴 DELETE (DELETE /users/:id)
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }
        res.json({ message: 'Utente eliminato', user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore nella cancellazione utente' });
    }
});

app.listen(port, () => console.log(`🚀 Server in ascolto su porta ${port}`));
