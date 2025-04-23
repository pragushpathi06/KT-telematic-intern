const { StudyMaterial , User } = require('../models/index');
// const LoginUser = require('../models/loginUser');
const bcrypt = require('bcrypt');


exports.registerUser = async (req, res) => {
  const { name, email, password, token, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await StudyMaterial .create({
      name,
      email,
      password,
      token:hashedPassword,
      role
    });

    res.status(201).json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.StudyMaterial  = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await StudyMaterial .findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Login error", details: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await StudyMaterial .findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCount = await StudyMaterial .destroy({ where: { id } });
  
      if (deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
``

  exports.getLoginUsersWithUserDetails = async (req, res) => {
    try {
      const loginUsers = await StudyMaterial .findAll({
        include: {
          model: User,
          // attributes: ['userid', 'first_name', 'personal_email','joined_date','city','profile_picture_url'], 
        }
      });
  
      res.status(200).json(loginUsers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
  };