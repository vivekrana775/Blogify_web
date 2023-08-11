const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('blog_app', 'postgres', '1234', {
    host: 'localhost',
    dialect: "postgres"
  });
const connectToDb=async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports= {sequelize,connectToDb}