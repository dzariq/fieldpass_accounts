const { Sequelize } = require('sequelize');
require('dotenv').config();

// Replace 'your_database_name', 'your_database_user', and 'your_database_password' with your MySQL database details
const sequelize = new Sequelize('fieldpass_club', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
