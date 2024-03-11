const { Logger } = require('../config');
const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    console.log("Inside Service")
    try {
        const airplane = await airplaneRepository.create(data);
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
        console.log("Airplace Error: ", error);
        throw new AppError("Cannot create a new airplane object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    }
    catch(error) {

    }
}

async function getAirplane(data) {
    try {
        const airplane = await airplaneRepository.get(data);
        return airplane;
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airplane does not exist", StatusCodes.NOT_FOUND);
        }
    }
}

async function updateAirplane(id, data) {
    try {
        console.log("Inside update servce");
        await airplaneRepository.update(id, data);
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airplane to be updated could not be found", StatusCodes.NOT_FOUND);
        }
    }
}

async function deleteAirplane(id) {
    try {
        await airplaneRepository.destroy(id);
    }
    catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Airplane to be deleted could not be found", StatusCodes.NOT_FOUND);
        }
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    updateAirplane,
    deleteAirplane
}