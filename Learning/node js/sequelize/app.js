const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./sequelize');
const User = require('./models/user');
const methodOverride = require('method-override'); // Add this line

const app = express();
const port = 3000;

// Add method-override middleware
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync().then(() => console.log("Database synced")).catch(console.error);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/form.html'));
});

// Create user route
app.post('/create', async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email
    });
    res.send("User created successfully!");
  } catch (err) {
    res.status(500).send("Error creating user.");
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users.");
  }
});

// Get a specific user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send("Error fetching user.");
  }
});

// Update user route (Using PUT)
app.post('/update/:id', async (req, res) => {
  try {
    await User.update(
      { name: req.body.name, age: req.body.age, email: req.body.email },
      { where: { id: req.params.id } }
    );
    res.send("User updated.");
  } catch (err) {
    res.status(500).send("Error updating user.");
  }
});

// Delete user route
app.delete('/delete/:id', async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.send("User deleted.");
  } catch (err) {
    res.status(500).send("Error deleting user.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


