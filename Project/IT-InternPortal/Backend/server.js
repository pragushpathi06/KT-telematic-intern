const express = require('express');
const sequelize = require('./config/database');
const studyMaterialRoutes = require('./routes/studyMaterialRoutes');
const userRoutes=require('./routes/userRoutes')
const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(express.json());

const PORT = 3000;
app.use(cors());

//  Use the auth routes under '/api'
// app.use('/api', authRoutes);

//login
app.use('/api/studyMaterial',studyMaterialRoutes); 
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
