const express = require('express');
const router = express.Router();
const userProgressController = require('../userProgress/userProgressController');

router.post('/create', userProgressController.createUserProgress);

router.get('/getAll', userProgressController.getAllUserProgress);

router.get('/getAll/:id', userProgressController.getUserProgressById);

router.put('/update/:id', userProgressController.updateUserProgress);

router.delete('/delete/:id', userProgressController.deleteUserProgress);

router.get('/completed-topics/:user_id', userProgressController.getCompletedTopicCountsByUser);

router.get('/completed-role/:user_id', userProgressController.getCompletedRoleCountsByUser);

module.exports = router;
