const express = require('express');
const router=express.Router();
const controller=require('./userController')
const authenticateToken = require('../../middlewares/auth');

router.post('/register',controller.registerUser);

router.post('/bulkRegister',controller.BulkRegisterUser);

router.get('/getUser', controller.getAllUsers);

router.get('/getUser/:id', controller.getSingleUser);

router.delete('/deleteUser/:id',controller.deleteUser);

router.put('/updateUser/:id',controller.updateUser);

router.post('/login', controller.loginUser);

router.get('/check',controller.check);

router.get('/protected', authenticateToken,controller.protected );

router.get('/getRoleUser/:id',controller.getOneUser);


router.get('/getAllUsersDetails',controller.getAllUsersDetails);

module.exports = router