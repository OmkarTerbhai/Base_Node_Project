const { FlightService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { Logger } = require('../config');

async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.message = "Successfully created an airplane";
        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.message = "Error occured while creating airplane";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAllFlights(req, res) {
    try {
        console.log("Inside controller...");
        const flights = await FlightService.getAllFlights(req.query);
        console.log("In Flgght service: ", flights);
        SuccessResponse.message = "Successfully found an flights";
        SuccessResponse.data = flights;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error) {

    }
}

async function getFlight(req, res) {
    try {
        console.log(req.params);
        const flight = await FlightService.getFlight(req.params.id);
        console.log(flight)
        SuccessResponse.message = "Successfully found a flight";
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.message = "Error occured while getting flight";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateRemainingSeats(req, res) {
    try {
        const response = await FlightService.updateRemainingSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            desc: req.body.desc
        })
        SuccessResponse.message = "Successfully update seats";
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.message = "Error occured while updating seats";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports =  {
    createFlight,
    getAllFlights,
    getFlight,
    updateRemainingSeats
}
