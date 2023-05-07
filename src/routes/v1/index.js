const express = require('express');
const AirplaneRoutes  = require('./airplane-routes');
const { InfoController } = require('../../controllers');

const router = express.Router();
router.use('/airplanes', AirplaneRoutes);
router.get('/info', InfoController.info);


module.exports = 
    router
