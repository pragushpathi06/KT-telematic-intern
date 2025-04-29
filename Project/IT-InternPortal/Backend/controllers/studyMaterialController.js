const { StudyMaterial, User } = require('../models/index');
// const bcrypt = require('bcrypt');


exports.registerStudyMaterial = async (req, res) => {
  const { topic, reference,status, youtube_link, tech ,role } = req.body;

  try {
    const newStudyMaterial = await StudyMaterial.create({
      topic,
      reference,
      youtube_link,
      status,
      tech,
      role,
    });

    res.status(201).json({ message: "Study Material Registered Successfully", data: newStudyMaterial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.bulkRegisterStudyMaterials = async (req, res) => {
  const studyMaterials = req.body; // Direct array of study materials

  try {
    // Check if studyMaterials is an array and not empty
    if (!Array.isArray(studyMaterials) || studyMaterials.length === 0) {
      return res.status(400).json({ error: "Please provide a non-empty array of study materials" });
    }

    // Create the study materials in bulk
    const newStudyMaterials = await StudyMaterial.bulkCreate(studyMaterials);

    // Send a response with the success message
    res.status(201).json({
      message: "Study Materials Registered Successfully",
      data: newStudyMaterials
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAllStudyMaterials = async (req, res) => {
  try {
    const studyMaterials = await StudyMaterial.findAll();
    res.status(200).json(studyMaterials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete 
exports.deleteStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await StudyMaterial.destroy({ where: { studyMaterialId: id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Study Material not found" });
    }

    res.status(200).json({ message: "Study Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get study materials with user details

exports.getStudyMaterialsWithUserDetails = async (req, res) => {
  try {
    const studyMaterials = await StudyMaterial.findAll({
      include: {
        model: User,  // Include related User details
        attributes: ['userid', 'name', 'email'], // You can specify attributes if needed
      }
    });

    res.status(200).json(studyMaterials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch study materials', details: error.message });
  }
};

exports.updateStudyMaterial = async (req, res) => {
  try {
    const { studymaterialid } = req.params;
    let { status } = req.body;

    
    const allowedStatus = ['not completed', 'on going', 'completed'];

  
    if (status) {
      status = status
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ error: `Invalid status value. Allowed values: ${allowedStatus.join(', ')}` });
      }
    }

    const material = await StudyMaterial.findByPk(studymaterialid);
    if (!material) {
      return res.status(404).json({ error: 'Study material not found' });
    }

    material.status = status;
    await material.save();

    res.json({ message: 'Status updated successfully' });

  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
