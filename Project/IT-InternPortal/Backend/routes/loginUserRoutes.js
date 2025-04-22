const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginUserController');

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/user', controller.getAllUsers);
router.delete('/user/:id', controller.deleteUser);

module.exports = router;
