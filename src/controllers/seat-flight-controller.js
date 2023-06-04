const { FlightService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { SuccessMessages , ErrorMessages } = require('../utils/constants');

async function createSeatFlight(req, res) {
    try {
        const checkIn = await FlightService.checkIn({
            seatId: req.body.seatId,
            flightId: req.body.flightId
        });
        SuccessResponse.message = "Successfully created a seat in flight";
        SuccessResponse.data = checkIn;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.message = "Error occured while creating city";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createSeatFlight
}