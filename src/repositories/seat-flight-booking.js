const CrudRepository = require('./crud-repository');
const { Seat_Flight_Booking } = require('../models');

class SeatFlightRepository extends CrudRepository {
    constructor() {
        super(Seat_Flight_Booking);
    }
}

module.exports = SeatFlightRepository;