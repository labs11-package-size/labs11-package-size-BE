const faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('boxes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('boxes').insert([
        {identifier: 1, dimensions: '6x6x2', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 2, dimensions: '7x5.5x1.25', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 3, dimensions: '8x5x2', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 4, dimensions: '9x6x3', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 5, dimensions: '9x8x2', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 6, dimensions: '10x8x4', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 7, dimensions: '12.5x10x4', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 8, dimensions: '6x6x6', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 9, dimensions: '8x6x4', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 10, dimensions: '8x8x8', maxWeight: '', custom: false, uuid: faker.random.uuid() },   
        {identifier: 11, dimensions: '10x8x6', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 12, dimensions: '10x10x10', maxWeight: '', custom: false, uuid: faker.random.uuid() },        
        {identifier: 13, dimensions: '12x6x6', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 14, dimensions: '12x12x8', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 15, dimensions: '12x12x12', maxWeight: '', custom: false, uuid: faker.random.uuid() },
        {identifier: 16, dimensions: '16x12x8', maxWeight: '', custom: false, uuid: faker.random.uuid() }
      ]);
    });
};
