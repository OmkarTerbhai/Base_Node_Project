const CrudRepository = require('./crud-repository');
const { Flight , Airplane , Airport , City} = require('../models');
const { Logger } = require('../config');
const { Sequelize } = require('sequelize');
const { response } = require('express');
const { addRowLockOnFlights } = require('./queries')

const db = require('../models');


class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async  getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: "airplaneDetails"
                },
                {
                    model: Airport,
                    required: true,
                    as: "departureAirportDetails",
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirportDetails.code"))
                    },
                    include: [
                        {
                            model: City,
                            reuired: true
                        }
                    ]
                },
                {
                    model: Airport,
                    required: true,
                    as: "arrivalAirportDetails",
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirportDetails.code"))
                    },
                }
            ]
        });
        return response;
    }


    async updateRemainingSeats(flightId, seats, desc = true) {
        const transaction = await db.sequelize.transaction();
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        if(desc) {
            await flight.decrement('totalSeats', {by: seats});
        }
        else {
            await flight.increment('totalSeats', {by: seats});
        }
        flight.save();
        return flight;
    }


}

module.exports = FlightRepository;