const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const { SuccessMessages , ErrorMessages } = require('../utils/constants');


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
            throw new AppError(ErrorMessages.CITY_NOT_FOUND, StatusCodes.NOT_FOUND);
        }
    }
}

async function getCityById(id) {
    try {
        const city = cityRepository.get(id);
        return city;
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(ErrorMessages.CITY_NOT_FOUND, StatusCodes.NOT_FOUND);
        }
    }

}

async function updateCities(id, data) {
    try {
        await cityRepository.update(id, data);
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(ErrorMessages.CITY_NOT_FOUND, StatusCodes.NOT_FOUND);
        }
    }
}

async function deleteCity(id) {
    try {
        await cityRepository.destroy(id);
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(ErrorMessages.CITY_NOT_FOUND, StatusCodes.NOT_FOUND);
        }
    }
}

module.exports = {
    createCity,
    getCities,
    updateCities,
    getCityById,
    deleteCity
}