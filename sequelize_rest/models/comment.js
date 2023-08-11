const {sequelize} = require("../db")
const {DataTypes} = require("sequelize")

const Comment = sequelize.define("comment",{

    content:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        onDelete:"CASCADE",
        references:{
            model:"users",
            key:"id"
        }
    },
    blog_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        onDelete:"CASCADE",
        references:{
            model:"blogs",
            key:"id"
        }
    },
    parent_id:{
        type:DataTypes.INTEGER,
        onDelete:"CASCADE",
        references:{
            model:'comments',
            key:"id"
        }
    }


})

// sequelize.sync({alter:true})


module.exports={Comment}