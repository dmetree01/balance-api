const { Sequelize } = require('sequelize');

module.exports = async ({ API_PORT, POSTGRES_CONNECTION_STRING }) => {
  const port = API_PORT;
  const sequelize = new Sequelize(POSTGRES_CONNECTION_STRING);
  
  return { port, sequelize };  
};