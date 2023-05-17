const express = require('express');
const { AirportController } = require('../../controllers');

const router = express.Router();

console.log("Inside airplane routes");
router.post('/',AirportController.createAirport)

router.get('/', AirportController.getAirports);

router.get('/:id', AirportController.getAirport);

router.patch('/:id', AirportController.updateAirport)

router.delete('/:id', AirportController.deleteAirport)

module.exports = 
    router
