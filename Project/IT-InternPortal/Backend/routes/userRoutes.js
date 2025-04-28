const express = require('express');
const router=express.Router();
const controller=require('../controllers/userController')
const authenticateToken = require('../middlewares/auth');

router.post('/register',controller.registerUser);

router.post('/bulkRegister',controller.BulkRegisterUser)

router.get('/getUser', controller.getAllUsers);

router.delete('/deleteUser/:id',controller.deleteUser);

router.put('/updateUser/:id',controller.updateUser);

router.post('/login', controller.loginUser);

router.get('/protected', authenticateToken, (req, res) => {
    // If the request reaches here, the token is valid
    res.json({
      message: 'This is a protected route!',
      name: req.user.first_name, // Send user data from the token payload
    });
  });


// router.get('/protected', authenticateJWT, (req, res) => {
//     res.status(200).json({ message: 'This is a protected route', user: req.user });
// });



// router.get('/getAllUsersDetails',controller.getAllUsersDetails);

module.exports = router