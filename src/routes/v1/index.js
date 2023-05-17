const express = require('express');
const AirplaneRoutes  = require('./airplane-routes');
const CityRoutes = require('./city-routes');
const { InfoController } = require('../../controllers');
const AirportRoutes = require('./airport-routes');

const router = express.Router();

console.log("Inside v1 routes")
router.use('/airplanes', AirplaneRoutes);
router.get('/info', InfoController.info);

router.use('/city', CityRoutes);

router.use('/airports', AirportRoutes);


module.exports = 
    router
