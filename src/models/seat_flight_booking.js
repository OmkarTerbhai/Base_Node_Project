'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat_Flight_Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seat_Flight_Booking.init({
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
      {
    sequelize,
    modelName: 'Seat_Flight_Booking',
    indexes: [
      {
          unique: true,
          fields: ['seatId', 'flightId']
      } 
    ]
  });
  return Seat_Flight_Booking;
};