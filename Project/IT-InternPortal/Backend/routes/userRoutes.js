const express = require('express');
const router=express.Router();
const controller=require('../controllers/userController')

router.post('/register',controller.registerUser);

router.post('/bulkRegister',controller.BulkRegisterUser)

router.get('/getUser', controller.getAllUsers);

router.delete('/deleteUser/:id',controller.deleteUser);

router.put('/updateUser/:id',controller.updateUser);
module.exports = router