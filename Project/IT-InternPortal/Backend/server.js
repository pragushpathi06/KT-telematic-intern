const express = require('express');
const sequelize = require('./config/database');
const loginUserRoutes = require('./routes/studyMaterialRoutes');
const userRoutes=require('./routes/userRoutes')
 

const app = express();
app.use(express.json());

const PORT = 3000;

//login
app.use('/api/login', loginUserRoutes); 
//user
app.use('/api/users',userRoutes);




app.use(/(.*)/, (req, res) => {
  res.status(404).json({ status: 'fail', message: 'Route not found' });
});

sequelize.authenticate()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Unable to connect to DB:", err));
