const { where } = require('sequelize');
const User = require('../models/user');

exports.registerUser = async (req,res) => {
    const {first_name , last_name, personal_email ,college_email , phone_number ,joined_date ,gender ,address ,city , state, pincode ,profile_picture_url ,status} = req.body;
    try {
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
      const newUsers = await User.bulkCreate(users);
      res.status(201).json({
        message: "Users Registered Successfully",
        data: newUsers,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
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