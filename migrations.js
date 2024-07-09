const { Sequelize } = require('sequelize');
const { Op } = require('@sequelize/core');
const { Umzug } = require('umzug');

module.exports = async ({ sequelize }) => {
    const umzug = new Umzug({
      migrations: [
        {
          // the name of the migration is mandatory
          name: '00-initial',
          async up({context: queryInterface}) {
              await queryInterface.createTable('users', {
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                  },
                balance: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
                  primaryKey: false,
                },
              });
              await queryInterface.addConstraint('users', {
                fields: ['balance'],
                type: 'check',
                where: {
                  balance: {
                    [Op.gte]: 0,
                  }
                }
              });
              await queryInterface.bulkInsert('users', [{user_id: 1, balance: 10000}]);
          },
          async down({context: queryInterface}) {
              await queryInterface.dropTable('users');
          },
        },
      ],
      context: sequelize.getQueryInterface(),
      logger: console,
    });
  
    await umzug.up();
  };