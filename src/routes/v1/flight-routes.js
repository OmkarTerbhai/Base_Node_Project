const express = require('express');
const { FlightController, SeatFlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares')

const router = express.Router();

router.post('/',FlightMiddlewares.validateTime, FlightController.createFlight);

router.get('/', FlightController.getAllFlights);

router.get('/:id', FlightController.getFlight);

router.patch('/:id/seats', FlightController.updateRemainingSeats);

router.post('/checkIn', SeatFlightController.createSeatFlight);

module.exports = 
    router
