const { Logger } = require('../config');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    console.log("Inside Service")
    try {
        const airplane = await airportRepository.create(data);
        return airplane;
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

async function getAirports() {
    try {
        const airplanes = await airportRepository.getAll();
        return airplanes;
    }
    catch(error) {

    }
}

async function getAirport(data) {
    try {
        const airplane = await airportRepository.get(data);
        return airplane;
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airplane does not exist", StatusCodes.NOT_FOUND);
        }
    }
}

async function updateAirport(id, data) {
    try {
        console.log("Inside update servce");
        await airportRepository.update(id, data);
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airplane to be updated could not be found", StatusCodes.NOT_FOUND);
        }
    }
}

async function deleteAirport(id) {
    try {
        await airportRepository.destroy(id);
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airplane to be deleted could not be found", StatusCodes.NOT_FOUND);
        }
    }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    deleteAirport
}