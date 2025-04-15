const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ktt-learning',
  password: 'pragush',
  port: 8706,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../express/form.html'));
});

app.post('/submit', async (req, res) => {
  const {
    tyreNo, make, model,
    tyreSize, createdDate,
    retreadDate, condition
  } = req.body;

  try {
    await pool.query(
      'INSERT INTO tyre (tyre_no, make, model, tyre_size, created_date, retread_date, condition) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [tyreNo, make, model, tyreSize, createdDate, retreadDate || null, condition]
    );
    res.send('Form submitted and saved to PostgreSQL successfully!');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Failed to store data in the database');
  }
});

app.get('/show', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tyre'); 
      res.json(result.rows); 
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Failed to fetch data from the database');
    }
  });
  


app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
