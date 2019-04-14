const uuidTimestamp = require("uuid/v1")

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('boxes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('boxes').insert([
        {identifier: 1, dimensions: '6x6x2', boxType: 'mailer', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 2, dimensions: '7x5.5x1.25', boxType: 'mailer', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 3, dimensions: '8x5x2', boxType: 'mailer', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 4, dimensions: '9x6x3', boxType: 'mailer', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 5, dimensions: '9x8x2', boxType: 'mailer', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 6, dimensions: '10x8x4', boxType: 'mailer', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 7, dimensions: '12.5x10x4', boxType: 'mailer', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 8, dimensions: '6x6x6', boxType: 'shipper', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 9, dimensions: '8x6x4', boxType: 'shipper', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 10, dimensions: '8x8x8', boxType: 'shipper', maxWeight: '', custom: false, uuid: uuidTimestamp()},   
        {identifier: 11, dimensions: '10x8x6', boxType: 'shipper', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 12, dimensions: '10x10x10', boxType: 'shipper', maxWeight: '', custom: false, uuid: uuidTimestamp()},        
        {identifier: 13, dimensions: '12x6x6', boxType: 'shipper', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 14, dimensions: '12x12x8', boxType: 'shipper', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 15, dimensions: '12x12x12', boxType: 'shipper', maxWeight: '', custom: false, uuid: uuidTimestamp()},
        {identifier: 16, dimensions: '16x12x8', boxType: 'shipper', maxWeight: '', custom: false, uuid: uuidTimestamp()}
      ]);
    });
};
