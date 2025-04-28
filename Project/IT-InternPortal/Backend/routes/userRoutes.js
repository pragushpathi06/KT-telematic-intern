const express = require('express');
const router=express.Router();
const controller=require('../controllers/userController')
// const authenticateJWT = require('../middlewares/authenticateJWT');

router.post('/register',controller.registerUser);

router.post('/bulkRegister',controller.BulkRegisterUser)

router.get('/getUser', controller.getAllUsers);

router.delete('/deleteUser/:id',controller.deleteUser);

router.put('/updateUser/:id',controller.updateUser);

// router.get('/protected', authenticateJWT, (req, res) => {
//     res.status(200).json({ message: 'This is a protected route', user: req.user });
// });



// router.get('/getAllUsersDetails',controller.getAllUsersDetails);

module.exports = router