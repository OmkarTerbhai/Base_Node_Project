'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seat_Flight_Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seatId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Seats',
          key: 'id'
        }
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Flights',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
    },{
      uniqueKeys: {
        unique_tag: {
            customIndex: true,
            fields: ["seatId", "flightId"]
        }
      }
    });
  } ,
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seat_Flight_Bookings');
  }
};