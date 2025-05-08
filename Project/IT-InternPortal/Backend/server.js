const express = require('express');
const sequelize = require('./config/database');
const studyMaterialRoutes = require('./api/studyMaterial/index');
const userRoutes=require('./api/user/index')
const userProgress = require('./api/userProgress/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(express.json());

const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../Frontend')));


//login
app.use('/api/studyMaterial',studyMaterialRoutes); 

//user
app.use('/api/users',userRoutes);

//userProgress
app.use('/api/userProgress',userProgress);



app.use(/(.*)/, (req, res) => {
  res.status(404).json({ status: 'fail', message: 'Route not found' });
});

sequelize.authenticate()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Unable to connect to DB:", err));



  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  });

  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(` Backend running at http://192.168.110.36:${PORT}`);
  });

  