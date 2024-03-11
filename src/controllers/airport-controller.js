const { AirportService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createAirport(req, res) {
    console.log("Inside airplane controller")
    try {
        
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            cityId: req.body.cityId
        });
        SuccessResponse.message = "Successfully created an airplane";
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.message = "Error occured while creating airplane";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAirports(req, res) {
    try {
        const airplanes = await AirportService.getAirports();
        SuccessResponse.message = "Successfully retrieved airplanes";
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {

    }
}

async function getAirport(req, res) {
    try {
        console.log(req.params)
        const airplane = await AirportService.getAirport(req.params.id);
        SuccessResponse.message = "Found the airplane";
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateAirport(req, res) {
    try {
        console.log(req.body);
        console.log(req.params);
        await AirportService.updateAirport(req.params.id, req.body);
        SuccessResponse.message = "Successfully updated airplane";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.error = error;
        return res.json(ErrorResponse);
    }
}

async function deleteAirport(req, res) {
    try {
        await AirportService.deleteAirport(req.params.id);
        SuccessResponse.message = "Successfully deleted the airplane";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.error = error;
        return res.json(ErrorResponse);
    }
}

module.exports =  {
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    deleteAirport
}
