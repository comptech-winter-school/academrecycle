'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recycle_cities', [{
      name: 'Омск',
      latitude: '54.98564',
      longitude: '73.370126',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recycle_cities', null, {});
  }
};
