const express = require('express');
const router = express.Router();
const controller = require('../controllers/studyMaterialController');

router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

router.get('/user', controller.getAllUsers);

router.delete('/user/:id', controller.deleteUser);

router.get('/getAllUserDetails',controller.getLoginUsersWithUserDetails);

module.exports = router;
