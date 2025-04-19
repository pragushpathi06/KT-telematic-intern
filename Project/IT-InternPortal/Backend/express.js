const express = require('express');
const path = require('path');
const db = require('./db.js');
const authRoutes = require('./auth.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

db.connect().then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log('Failed to connect to database:', err.message);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json()); 
app.use('/api/auth', authRoutes); 

app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
});
