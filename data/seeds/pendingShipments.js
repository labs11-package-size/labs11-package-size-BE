const faker = require("faker");
const moment = require('moment')

const renderRecords = () => {
  const currenttime = moment().format("YYYY-MM-DD hh:mm:ss")
  const renderedRecords = []
  for (i = 0; i < 5; i++) {
    renderedRecords.push({identifier: 1 + (i * 23), totalWeight: 201.9, modelURL: "http://www.google.com", boxId: 1, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 2 + (i * 23), totalWeight: 404.9, modelURL: "http://www.google.com", boxId: 8, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 3 + (i * 23), totalWeight: 155.52, modelURL: "http://www.google.com", boxId: 12, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 4 + (i * 23), totalWeight: 678.9, modelURL: "http://www.google.com", boxId: 2, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 5 + (i * 23), totalWeight: 2.9, modelURL: "http://www.google.com", boxId: 6, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 6 + (i * 23), totalWeight: 200, modelURL: "http://www.google.com", boxId: 7, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 7 + (i * 23), totalWeight: 300, modelURL: "http://www.google.com", boxId: 11, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 8 + (i * 23), totalWeight: 3, modelURL: "http://www.google.com", boxId: 16, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 9 + (i * 23), totalWeight: 33, modelURL: "http://www.google.com", boxId: 16, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 10 + (i * 23), totalWeight: 2, modelURL: "http://www.google.com", boxId: 10, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 11 + (i * 23), totalWeight: 5, modelURL: "http://www.google.com", boxId: 11, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 12 + (i * 23), totalWeight: 586, modelURL: "http://www.google.com", boxId: 7, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 13 + (i * 23), totalWeight: 1337, modelURL: "http://www.google.com", boxId: 5, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 15 + (i * 23), totalWeight: 896, modelURL: "http://www.google.com", boxId: 4, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 16 + (i * 23), totalWeight: 202, modelURL: "http://www.google.com", boxId: 7, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 17 + (i * 23), totalWeight: 303, modelURL: "http://www.google.com", boxId: 7, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 18 + (i * 23), totalWeight: 9, modelURL: "http://www.google.com", boxId: 7, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 19 + (i * 23), totalWeight: 23, modelURL: "http://www.google.com", boxId: 6, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 20 + (i * 23), totalWeight: 25, modelURL: "http://www.google.com", boxId: 1, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 22 + (i * 23), totalWeight: 13, modelURL: "http://www.google.com", boxId: 3, uuid: faker.random.uuid(), lastUpdated: currenttime},
    {identifier: 23 + (i * 23), totalWeight: .5, modelURL: "http://www.google.com", boxId: 9, uuid: faker.random.uuid(), lastUpdated: currenttime}
    )
  }
  return renderedRecords
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pendingShipments').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('pendingShipments').insert(
        renderRecords()
      );
    });
};
