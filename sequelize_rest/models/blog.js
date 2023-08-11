const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");

const Blog = sequelize.define("blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue:0
  },
  user_id: {
    type: DataTypes.INTEGER,
    onDelete:"CASCADE",
    references: {
      model: "users",
      key: "id",
    },
    allowNull: false,
  },
});

// sequelize.sync({alter:true})

module.exports={Blog}
