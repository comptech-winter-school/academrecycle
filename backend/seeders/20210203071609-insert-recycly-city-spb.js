'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recycle_cities', [{
      name: 'Санкт-Петербург',
      latitude: '59.9353923257',
      longitude: '30.302746582',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recycle_cities', null, {});
  }
};
