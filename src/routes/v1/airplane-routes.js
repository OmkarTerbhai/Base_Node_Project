const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const router = express.Router();

console.log("Inside airplane routes");
router.post('/', AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane)

router.get('/', AirplaneController.getAirplanes);

router.get('/:id', AirplaneController.getAirplane);

router.patch('/:id', AirplaneController.updateAirplane)

module.exports = 
    router
