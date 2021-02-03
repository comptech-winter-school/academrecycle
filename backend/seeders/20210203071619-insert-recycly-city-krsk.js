'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recycle_cities', [{
      name: 'Красноярск',
      latitude: '56.0153',
      longitude: '92.8932',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recycle_cities', null, {});
  }
};
