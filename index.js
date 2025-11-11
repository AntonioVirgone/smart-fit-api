const express = require('express')
const app = express()
app.use(express.json())

const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false }});
await client.connect();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000')
})