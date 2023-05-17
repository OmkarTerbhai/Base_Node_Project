const express = require('express');
const { CityController } = require('../../controllers');

const router = express.Router();

router.post('/', CityController.createCity);

router.get('/', CityController.getCities);

router.get('/:id', CityController.getCityById)

router.put('/:id', CityController.updateCity)

router.delete('/:id', CityController.deleteCity);

module.exports = router;