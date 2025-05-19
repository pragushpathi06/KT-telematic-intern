const { StudyMaterial, User } = require('../../models/index');
// const bcrypt = require('bcrypt');


exports.registerStudyMaterial = async (req, res) => {
  const { topic, reference,youtube_link, tech ,role } = req.body;

  try {
    const newStudyMaterial = await StudyMaterial.create({
      topic,
      reference,
      youtube_link,
      tech,
      role,
    });

    res.status(201).json({ message: "Study Material Registered Successfully", data: newStudyMaterial });
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message });
  }
};


exports.bulkRegisterStudyMaterials = async (req, res) => {
  const studyMaterials = req.body; // Direct array of study materials

  try {
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
    res.status(500).json({ 
      success:false,
      message: error.message  });
  }
};



exports.getAllStudyMaterials = async (req, res) => {
  try {
    const studyMaterials = await StudyMaterial.findAll();
    res.status(200).json({
      success:true,
      result:studyMaterials
    });
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message  });
  }
};

exports.getSingleStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const studyMaterial = await StudyMaterial.findByPk(id);
    
    if (!studyMaterial) {
      return res.status(404).json({ message: 'Study material not found' });
    }

    res.status(200).json({
      success:true,
      result:studyMaterial});
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message  });
  }
};


// Delete 
exports.deleteStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await StudyMaterial.destroy({ where: { studymaterialid: id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Study Material not found" });
    }

    res.status(200).json({ message: "Study Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message  });
  }
};

// Get study materials with user details

exports.getStudyMaterialsWithUserDetails = async (req, res) => {
  try {
    const studyMaterials = await StudyMaterial.findAll({
      include: {
        model: User,  
        attributes: ['userid', 'name', 'email'],
      }
    });

    res.status(200).json(
      {
      success:true,
      result:studyMaterials});
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message ,
      error: 'Failed to fetch study materials'});
  }
};

exports.updateStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await StudyMaterial.findByPk(id);

    if (!material) {
      return res.status(404).json({ error: 'Study material not found' });
    }

    const { topic, reference, youtube_link, tech, role } = req.body;

    await material.update({
      topic,
      reference,
      youtube_link,
      tech,
      role
    });
    res.json({ message: 'Study material updated successfully', data: material });

  } catch (error) {
    console.error('Error updating study material:', error);
    res.status(500).json({ 
      success:false,
      message: error.message, 
      error: 'Server error' });
  }
};
