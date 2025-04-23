// const User = require('../models/user');
const { Op } = require("sequelize");
const { LoginUser, User } = require('../models/index');
const bcrypt = require('bcrypt');

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
        res.status(200).json({
            message:'User list',
            data: getUser
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
  }


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
        const {id}=req.params;
        const [updateCount]= await User.update(req.body, {
            where: { userid: id },
          });
        if (updateCount === 0) {
            return res.status(404).json({ message: "User not found" });
          }
        const updatedUser = await User.findByPk(id);
        res.status(200).json({ message: "User updated", data: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

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