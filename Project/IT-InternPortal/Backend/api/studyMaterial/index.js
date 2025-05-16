const express = require('express');
const router = express.Router();
const controller = require('../studyMaterial/studyMaterialController');

// Route to register study material
router.post('/add', controller.registerStudyMaterial);

// Route to register study material
router.post('/addBulk', controller.bulkRegisterStudyMaterials);

// Route to get all study materials
router.get('/all', controller.getAllStudyMaterials);

// Route to delete a study material
router.delete('/delete/:id', controller.deleteStudyMaterial);


// Route to delete a study material
router.put('/updateStatus/:id', controller.updateStudyMaterial);

//Route to get one study materials
router.get('/get/:id',controller.getSingleStudyMaterial);

// Route to get study materials with user details
router.get('/withUserDetails', controller.getStudyMaterialsWithUserDetails);

module.exports = router;
