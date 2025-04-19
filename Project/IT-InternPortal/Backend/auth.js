const express = require('express');
const router = express.Router();
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();



// Register route
router.post('/register', async (req, res) => {
    console.log(res.body);
    
    const { name, email, password, role } = req.body;
   
    // Basic validation of required fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    try {
        // Check if a user with the same email already exists
        const existing = await pool.query('SELECT * FROM login_user WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO login_user (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, role || 'intern']
        );
        
        // Respond with the newly created user data
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (err) {
        // Respond with detailed error if something goes wrong
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM login_user WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const user = result.rows[0];

        // Compare password with the hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Store the token in the database (optional)
        await pool.query('UPDATE login_user SET token = $1 WHERE id = $2', [token, user.id]);

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


module.exports = router;
