const CrudRepository = require('./crud-repository');
const { Airplane } = require('../models');

class CityRepository extends CrudRepository {
    constructor() {
        super(Airplane);
    }
}

module.exports = CityRepository;