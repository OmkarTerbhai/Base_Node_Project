const { Logger } = require('../config');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const AirportService = require('./airport-service');


const flightRepository = new FlightRepository();

async function createFlight(data) {
    console.log("Inside Service")
    try {
        const flight = await flightRepository.create(data);
        return flight;
    }
    catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            Logger.error(error);
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
        }
        throw new AppError("Cannot create a new airplane object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    if(query.trips) {
        console.log("Inside if");
        [ departureAirportId , arrivalAirportId ] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        //TODO: departure and arrival port cannot be the same

    }

    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between] : [minPrice, maxPrice]
        }

    }

    if(query.tripDate) {
        console.log(query.tripDate);
        customFilter.departureTime = {
            [Op.eq]: query.tripDate + " 00:00:00"
        }
    }

    if(query.sortBy) {
        let criteria = query.sortBy.split(",");

        let criteriaDetails = criteria.map((c) => c.split("_"));

        sortFilter = criteriaDetails;

    }
    /**
     * The flight details should have the airport details.
     * So, 
     * [f1, f2, f3]
     * [f1.a1, f2.a2, f3.a3]
     * [{Flight1}, {Flight2.datavalues}]
     */

    const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
    let arrivalAirportCodes = [];
    flights.forEach( (f) => arrivalAirportCodes.push(f.dataValues.arrivalAirportId));
    const airports = await AirportService.getAirports(arrivalAirportCodes);
    let airportDetails = [];
    flights.forEach((flight) => {
        flight.dataValues.arrivalAirportDetails = 
            airports.forEach((airport) => {
                if(airport.dataValues.code == flight.dataValues.arrivalAirportId) {
                    console.log("For each values: ", airport.dataValues);
                    airportDetails.push(airport.dataValues);
                }
        });
    });
    mapFlightToAirport(flights, airportDetails);
    function mapFlightToAirport(flights, airports) {
        console.log("Flight size ", flights.length);
        console.log("Airport size ", airports.length);
        for(let i = 0; i < flights.length; i++) {
            flights[i].dataValues.arrivalAirportDetails = airportDetails[i];
        }
    }

    return flights;
}

module.exports = {
    createFlight,
    getAllFlights
}