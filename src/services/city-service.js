const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const newCity = cityRepository.create(data);
        return newCity;
    }
    catch(error) {
        throw new AppError("Error in creating new city", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities() {
    try {
        const cities = cityRepository.getAll();
        return cities;
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Cities not found", StatusCodes.NOT_FOUND);
        }
    }
}

module.exports = {
    createCity,
    getCities
}