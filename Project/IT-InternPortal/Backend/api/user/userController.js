// const User = require('../models/user');
const { Op } = require("sequelize");
const { Sequelize } = require('sequelize')
// const { User } = require('../../models/index');
const { User, UserProgress, StudyMaterial } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req,res) => { 

  const {first_name , last_name, personal_email ,college_email , phone_number ,joined_date ,gender ,address ,city , state, pincode ,profile_picture_url,password,role ,status} = req.body;
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
          first_name, 
          last_name, 
          personal_email,
          college_email, 
          phone_number,
          joined_date ,
          gender,
          address,
          city,
          state,
          pincode ,
          profile_picture_url ,
          password: hashedPassword,
          role,
          status 
      });
      // 201	Created
      res.status(201).json({ message: "User Registered Successfully", data: newUser })
  } catch (error) {
      res.status(500).json({ 
        success:false,
        message: error.message  }); 
  }

}


exports.BulkRegisterUser = async (req, res) => {
  const users = req.body;

  try {

    const emails = users.map((user) => user.personal_email);

    const existingUsers = await User.findAll({
      where: {
        personal_email: {
          [Op.in]: emails
        }
      }
    });

    const existingEmails = existingUsers.map((user) => user.personal_email);

    const filteredUsers = users.filter(
      (user) => !existingEmails.includes(user.personal_email)
    );
    if (filteredUsers.length === 0) {
      return res.status(409).json({
        success:false,
        message: "All provided emails already exist",
        existingEmails
      });
    }

    const usersWithHashedPasswords = await Promise.all(
      filteredUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    const newUsers = await User.bulkCreate(usersWithHashedPasswords);

    res.status(201).json({
      message: "Users Registered Successfully",
      data: newUsers,
      skippedEmails: existingEmails
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message ,
      details: error.errors || error
    });
  }
};


exports.getAllUsers = async (req,res) => {
    try {
        const getUser = await User.findAll();
        res.status(200).json({
          success:true,
          result:getUser
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message 
        })
    }
  }

exports.getSingleUser = async (req,res) => {
    try {
        const {id} = req.params;
        const getUser = await User.findByPk(id);
        res.status(200).json(
          {
            success:true,
            result: getUser
          }
         )
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message 
        })
    }
  }


exports.getOneUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id ,{
        attributes: ['role']
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User progress not found' });
      }
      res.status(200).json({
        success:true,
        result:{
          role:user.role
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success:false,
        message: error.message });
  }
};

exports.deleteUser = async (req,res) => {
    try {
        const {id}=req.params;
        const deleted = await User.destroy({where:{userid:id}})
        if (deleted === 0) {
            return res.status(404).json({ message: "User not found" });
          }
          res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ 
          success:false,
        message: error.message 
         });
    }
  }


exports.updateUser = async (req,res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    const [updateCount] = await User.update(updateData, {
      where: { userid: id },
    });

    if (updateCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findByPk(id);
    res.status(200).json(
      {
        success:true,
        result:updatedUser
      });

  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message 
     });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { personal_email: email }
    });

    if (!user) {
      return res.status(404).json({ 
        success:false,
        message: 'Email not found' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({
        success:false,
        message: 'Incorrect email or password' });
    }

    const token = jwt.sign(
      { user_id: user.userid, first_name: user.first_name },
      "f6$4Jd!p0#Wq9m@Z",
      { expiresIn: "1d" }
    );

    const userData = user.toJSON(); 
    userData.password = "";         
    userData.token = token;         

    res.status(200).json({
      success: true,
      result: userData
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success:false,
      message: error.message  });
  }
};


exports.protected =async (req,res) => {
  if (req.user && req.user.first_name) { 
    res.json({
      message: 'This is a protected route!',
      name:req.user.first_name 
    });
  } else {
    res.status(400).json({
      success:false,
      message: 'User data is missing in the token.',
       message: error.message
    });
  }
}

exports.check = async (req, res) => {
  const { value, type } = req.query;

  if (!value || !type) {
    return res.status(400).json({ 
      success:false,
      essage: 'Value and type are required' ,
    message: error.message});
  }

  let where = {};
  if (type === 'personal_email') where.personal_email = value;
  else if (type === 'college_email') where.college_email = value;
  else if (type === 'phone_number') where.phone_number = value;
  else return res.status(400).json({
    success:false,
    message: 'Invalid type' ,
  message: error.message});

  try {
    const existing = await User.findOne({ where });
    res.json({ exists: !!existing });
  } catch (err) {
    res.status(500).json({ 
      success:false,
      message: 'Internal server error' });
  }
};

exports.getAllUsersDetails = async (req, res) => {
  try {
    const usersDetails = await User.findAll({
      attributes: [
        "userid", "first_name", "last_name", "personal_email", "college_email",
        "phone_number", "joined_date", "gender", "address", "city", "state",
        "pincode", "profile_picture_url", "role", "status"
      ],
      include: {
        model: UserProgress,
        attributes: ['id'],
        include: {
          model: StudyMaterial,
          attributes: ["topic", "tech", "role"]
        }
      }
    });

    const totalTopics = await StudyMaterial.findAll({
      attributes: [
        ['role', 'role'],
        [Sequelize.fn('COUNT', Sequelize.col('role')), 'totalCount']
      ],
      group: ['role']
    });

    const totalCountMap = {};
    totalTopics.forEach(topic => {
      totalCountMap[topic.dataValues.role] = parseInt(topic.dataValues.totalCount);
    });

    res.status(200).json({
      success:true,
      result:{
      usersDetails,
      total_count: totalCountMap
      }
      
    });

  } catch (error) {
    res.status(500).json({ 
      success:false,
      error: 'Failed to fetch data', 
      message: error.message });
  }
};
