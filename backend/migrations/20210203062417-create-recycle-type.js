'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('recycle_types', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            recycle_points_id: {
                references: {
                    model: 'recycle_points',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                type: Sequelize.INTEGER
            },
            recycle_cities_id: {
                references: {
                    model: 'recycle_cities',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                type: Sequelize.INTEGER
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('recycle_types');
    }
};