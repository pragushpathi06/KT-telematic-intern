// const { User, StudyMaterial,UserProgress } = require('../models/index'); // adjust the path if needed
const { sequelize } = require('../../models');
const { Sequelize } = require('sequelize');
const { User, UserProgress, StudyMaterial } = require('../../models');



exports.createUserProgress = async (req, res) => {
  try {
    const { user_id, studymaterialid, status } = req.body;

    const existing = await UserProgress.findOne({
      where: { user_id, studymaterialid }
    });

    if (existing) {
      return res.status(400).json({ message: 'This user already has progress recorded for this study material.' });
    }

    const newProgress = await UserProgress.create({
      user_id,
      studymaterialid,
      status
    });

    res.status(201).json(newProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user progress' });
  }
};



exports.getAllUserProgress = async (req, res) => {
  try {
    const progressList = await UserProgress.findAll();
    res.status(200).json(progressList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user progress' });
  }
};





exports.getUserProgressById = async (req, res) => {
  try {
    const { id } = req.params;
    const progress = await UserProgress.findByPk(id);

    if (!progress) {
      return res.status(404).json({ message: 'User progress not found' });
    }

    res.status(200).json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user progress' });
  }
};


exports.updateUserProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, studymaterialid, status } = req.body;

    const progress = await UserProgress.findByPk(id);

    if (!progress) {
      return res.status(404).json({ message: 'User progress not found' });
    }

    progress.user_id = user_id ?? progress.user_id;
    progress.studymaterialid = studymaterialid ?? progress.studymaterialid;
    progress.status = status ?? progress.status;

    await progress.save();

    res.status(200).json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user progress' });
  }
};


exports.deleteUserProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const progress = await UserProgress.findByPk(id);

    if (!progress) {
      return res.status(404).json({ message: 'User progress not found' });
    }

    await progress.destroy();

    res.status(200).json({ message: 'User progress deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user progress' });
  }
};


// exports.getCompletedTopicCountsByUser = async (req, res) => {
//     try {
//         const { user_id } = req.params;
    
//         const results = await UserProgress.findAll({
//           attributes: [
//             [Sequelize.col('StudyMaterial.tech'), 'tech'], // fixed here
//             [Sequelize.fn('COUNT', Sequelize.col('user_progress.id')), 'completedCount']
//             [Sequelize.fn('COUNT', Sequelize.col('StudyMaterial.tech')), 'TotalCount']

//           ],
//           include: [
//             {
//               model: StudyMaterial,
//               attributes: [] 
//             }
//           ],
//           where: {
//             user_id,
//             status: 'Completed'
//           },
//           group: ['StudyMaterial.tech'] // fixed here
//         });
    
//         res.status(200).json(results);
//       } catch (error) {
//         console.error('Error fetching completed topic counts:', error);
//         res.status(500).json({ message: 'Server error' });
//       }
//   };

exports.getCompletedTopicCountsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    // 1. Get completed topics grouped by tech
    const completedTopics = await UserProgress.findAll({
      attributes: [
        [Sequelize.col('StudyMaterial.tech'), 'tech'],
        [Sequelize.fn('COUNT', Sequelize.col('user_progress.id')), 'completedCount']
      ],
      include: [
        {
          model: StudyMaterial,
          attributes: []
        }
      ],
      where: {
        user_id,
        status: 'Completed'
      },
      group: ['StudyMaterial.tech']
    });

    const totalTopics = await StudyMaterial.findAll({
      attributes: [
        ['tech', 'tech'],
        [Sequelize.fn('COUNT', Sequelize.col('tech')), 'totalCount']
      ],
      group: ['tech']
    });

    const merged = totalTopics.map(total => {
      const match = completedTopics.find(c => c.dataValues.tech === total.dataValues.tech);
      return {
        tech: total.dataValues.tech,
        totalCount: parseInt(total.dataValues.totalCount),
        completedCount: match ? parseInt(match.dataValues.completedCount) : 0
      };
    });

    res.status(200).json(merged);
  } catch (error) {
    console.error('Error fetching topic progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  
  exports.getCompletedRoleCountsByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
    
        const results = await UserProgress.findAll({
          attributes: [
            [Sequelize.col('StudyMaterial.role'), 'Role'], // fixed here
            [Sequelize.fn('COUNT', Sequelize.col('user_progress.id')), 'completedCount']
          ],
          include: [
            {
              model: StudyMaterial,
              attributes: [] 
            }
          ],
          where: {
            user_id,
            status: 'Completed'
          },
          group: ['StudyMaterial.role']
        });
    
        res.status(200).json(results);
      } catch (error) {
        console.error('Error fetching completed topic counts:', error);
        res.status(500).json({ message: 'Server error' });
      }
  };
  