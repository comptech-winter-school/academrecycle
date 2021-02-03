'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recycle_cities', [{
      name: 'Новосибирск',
      latitude: '55.025377',
      longitude: '82.920857',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recycle_cities', null, {});
  }
};
