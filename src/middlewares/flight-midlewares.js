const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { Logger } = require('../config');


function validateCreateRequest(req, res, next) {
    console.log("Inside middleware")
    if(!req.body.name) {
        ErrorResponse.message = "Something went wrong while creating an airplane";
        ErrorResponse.error = {explanation: "Model Number is not present in request"};
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.code) {
        ErrorResponse.message = "Something went wrong while creating an airplane";
        ErrorResponse.error = {explanation: "Model Number is not present in request"};
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.cityId) {
        ErrorResponse.message = "Something went wrong while creating an airplane";
        ErrorResponse.error = {explanation: "City Id Number is not present in request"};
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

function validateTime(req, res, next) {
    let departureTime = new Date(req.body.departureTime).getTime();
    let arrivalTime = new Date(req.body.arrivalTime).getTime();

    if(arrivalTime - departureTime <= 0) {
        ErrorResponse.message = "Departure time should be before arrival time";
        ErrorResponse.error = {explanation: "Departure time should be before arrival time"};
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest,
    validateTime
}