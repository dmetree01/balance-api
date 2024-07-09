const { Sequelize } = require('sequelize');

module.exports = async ({ POSTGRES_CONNECTION_STRING }) => {
  const sequelize = new Sequelize(POSTGRES_CONNECTION_STRING);
  
  return { sequelize };  
};