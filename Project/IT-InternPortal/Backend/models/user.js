const {DataTypes} = require('sequelize');
const sequelize =require('../config/database')

const User=sequelize.define('user',{
    userid:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    first_name:{
        type: DataTypes.STRING(20),
        allowNull:false
    },
    last_name:{
        type: DataTypes.STRING(20),
        allowNull:false
    },
    personal_email:{
        type: DataTypes.STRING(60),
        allowNull:false,
        validate:{
            isEmail:true,
        }
    },
    college_email:{
        type: DataTypes.STRING(60),
        allowNull:false,
        validate:{
            isEmail:true,
        }
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isNumeric:true,
            len:[10,15],
        }
    },
    joined_date:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    gender:{
        type: DataTypes.STRING(20),
        allowNull:false,
    },
    address:{
        type: DataTypes.STRING(255),
        allowNull:false
    },
    city:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    state:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    pincode:{
        type: DataTypes.STRING(10),
        allowNull:false,
        validate: {
          isNumeric: true,
        },
    },
    profile_picture_url:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isUrl:true,
        }
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING
    },
    status:{
        type: DataTypes.ENUM("Active", "Inactive"),
        allowNull:false,
        defaultValue: 'Active',
    },
},{
    tableName:'users',
    timestamps:false,
});

module.exports = User