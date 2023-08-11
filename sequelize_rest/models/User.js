const {sequelize} = require('../db')
const { DataTypes } =require('sequelize')
const { Comment } = require("../models/comment");

const User = sequelize.define('users',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
// User.hasMany(Comment);
// sequelize.sync({force:true})

module.exports= {User}