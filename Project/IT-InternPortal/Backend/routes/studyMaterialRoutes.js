const express = require('express');
const router = express.Router();
const controller = require('../controllers/studyMaterialController');

// Route to register study material
router.post('/add', controller.registerStudyMaterial);

// Route to register study material
router.post('/addBulk', controller.bulkRegisterStudyMaterials);

// Route to get all study materials
router.get('/all', controller.getAllStudyMaterials);

// Route to delete a study material
router.delete('/:id', controller.deleteStudyMaterial);


// Route to delete a study material
router.put('/updateStatus/:id', controller.updateStudyMaterial);



// Route to get study materials with user details
router.get('/withUserDetails', controller.getStudyMaterialsWithUserDetails);

module.exports = router;
