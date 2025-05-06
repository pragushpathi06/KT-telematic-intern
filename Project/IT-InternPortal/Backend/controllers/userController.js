// const User = require('../models/user');
const { Op } = require("sequelize");
const { User } = require('../models/index');
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
      res.status(500).json({ error: error.message }); 
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
    console.error(error);
    res.status(500).json({
      error: error.message,
      details: error.errors || error
    });
  }
};


exports.getAllUsers = async (req,res) => {
    try {
        const getUser = await User.findAll();
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
  }

exports.getSingleUser = async (req,res) => {
    try {
        const {id} = req.params;
        const getUser = await User.findByPk(id);
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({
            error:error.message
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
        role:user.role
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user' });
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
        res.status(500).json({ error: error.message });
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
    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.loginUser = async (req,res) => {
  try {
    const {email,password} =req.body;
    const user =await User.findOne({
      where:{personal_email:email}
    });
    if (!user){
      return res.status(404).json('Email not found');
    }

    const passwordValid = await bcrypt.compare(password,user.password);
    
    if(!passwordValid){
      return res.status(404).json('Incorrect email and password'+" "+password+user.password)
    }
    const token = jwt.sign({ user_id:user.userid ,first_name: user.first_name },"f6$4Jd!p0#Wq9m@Z" ,{
      expiresIn : "1d"
    });
    res.status(200).send({
      user_id:user.userid,
      name:user.first_name,
      email:user.personal_email,
      accessToken :token
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send('login error');
  }
}

exports.protected =async (req,res) => {
  if (req.user && req.user.first_name) { // Check if the user data is available
    res.json({
      message: 'This is a protected route!',
      name:req.user.first_name  // Send the user's first name from the token
    });
  } else {
    res.status(400).json({
      message: 'User data is missing in the token.'
    });
  }
}

exports.check = async (req, res) => {
  const { value, type } = req.query;

  if (!value || !type) {
    return res.status(400).json({ message: 'Value and type are required' });
  }

  let where = {};
  if (type === 'personal_email') where.personal_email = value;
  else if (type === 'college_email') where.college_email = value;
  else if (type === 'phone_number') where.phone_number = value;
  else return res.status(400).json({ message: 'Invalid type' });

  try {
    const existing = await User.findOne({ where });
    res.json({ exists: !!existing });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


// exports.getAllUsersDetails = async (req, res) => {
//     try {
//       const UsersDetails = await User.findAll({
//         include: {
//           model: LoginUser,
//         }
//       });
  
//       res.status(200).json(UsersDetails);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch data', details: error.message });
//     }
//   };