const { CityService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { SuccessMessages , ErrorMessages } = require('../utils/constants');


async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.message = "Successfully created an city";
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.message = "Error occured while creating city";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getCities(req, res) {
    try {
        const cities = await CityService.getCities();
        SuccessResponse.data = cities;
        SuccessResponse.message = "Successfully found cities";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.message = "Error occured while finding cities";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getCityById(req, res) {
    try {
        const city = await CityService.getCityById(req.params.id);
        SuccessResponse.data = city;
        SuccessResponse.message = "Found the city successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.message = "Error occured while finding cities";
        ErrorResponse.error = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateCity(req, res) {
    try {
        console.log(req.params);
        console.log(req.body);
        await CityService.updateCities(req.params.id, req.body);
        SuccessResponse.message = SuccessMessages.UPDATE_CITY_SUCCESS;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.error = error;
        return res.json(ErrorResponse);
    }
}

async function deleteCity(req, res) {
    try {
        await CityService.deleteCity(req.params.id);
        SuccessResponse.message = "City deleted successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error) {
        ErrorResponse.error = error;
        return res.json(ErrorResponse);
    }
}

module.exports =  {
    createCity,
    getCities,
    updateCity,
    getCityById,
    deleteCity
}
