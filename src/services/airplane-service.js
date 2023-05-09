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

    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
}