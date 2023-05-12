const express = require('express');
const AirplaneRoutes  = require('./airplane-routes');
const CityRoutes = require('./city-routes');
const { InfoController } = require('../../controllers');

const router = express.Router();

console.log("Inside v1 routes")
router.use('/airplanes', AirplaneRoutes);
router.get('/info', InfoController.info);

router.use('/city', CityRoutes);


module.exports = 
    router
