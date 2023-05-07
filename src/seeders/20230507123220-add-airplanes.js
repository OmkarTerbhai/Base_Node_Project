'use strict';
const { Op } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Airplanes', [{
         modelNumber: 'Airbus356',
         capacity: 234,
         createdAt: new Date(),
         updatedAt: new Date()
       },
      {
        modelNumber: 'Airbus357',
        capacity: 236,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', 
    {[Op.or]:
      [{ modelNumber: 'Airbus357'}, 
      {modelNumber: 'Airbus356'}]});

  }
};
