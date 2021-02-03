'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recycle_cities', [{
      name: 'Москва',
      latitude: '55.7580321449',
      longitude: '37.6168444863',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recycle_cities', null, {});
  }
};
