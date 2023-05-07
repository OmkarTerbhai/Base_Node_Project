const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');

async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created an airplane",
            data: airplane,
            error: {}
        })
    }
    catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error occured while creating airplane",
            data: airplane,
            error: {}
        });
    }
}

module.exports =  createAirplane;
