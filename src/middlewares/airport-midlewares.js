const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');

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

module.exports = {
    validateCreateRequest
}