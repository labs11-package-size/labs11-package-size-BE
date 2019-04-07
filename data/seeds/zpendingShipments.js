const faker = require("faker");
const moment = require('moment')
const db = require("../dbConfig.js");

const renderRecords = (namesObject) => {
  const currenttime = moment().format("YYYY-MM-DD hh:mm:ss")
  const renderedRecords = []
  for (i = 0; i < 5; i++) {
    renderedRecords.push({identifier: 1 + (i * 23), productNames: namesObject[1 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12x6x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 2 + (i * 23), productNames: namesObject[2 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"7x5.5x1.25", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 3 + (i * 23), productNames: namesObject[3 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"7x5.5x1.25", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 4 + (i * 23), productNames: namesObject[4 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10x8x6", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 5 + (i * 23), productNames: namesObject[5 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10x10x10", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 6 + (i * 23), productNames: namesObject[6 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12x12x8", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 7 + (i * 23), productNames: namesObject[7 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"9x6x3", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 8 + (i * 23), productNames: namesObject[8 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12x6x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 9 + (i * 23), productNames: namesObject[9 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12.5x10x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 10 + (i * 23), productNames: namesObject[10 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12x6x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 11 + (i * 23), productNames: namesObject[11 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8x5x2", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 12 + (i * 23), productNames: namesObject[12 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12.5x10x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 13 + (i * 23), productNames: namesObject[13 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12x6x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 14 + (i * 23), productNames: namesObject[14 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8x5x2", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 15 + (i * 23), productNames: namesObject[15 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10x10x10", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 16 + (i * 23), productNames: namesObject[16 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12x6x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 17 + (i * 23), productNames: namesObject[17 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8x5x2", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 18 + (i * 23), productNames: namesObject[18 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12x6x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 19 + (i * 23), productNames: namesObject[19 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10x10x10", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 20 + (i * 23), productNames: namesObject[20 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8x5x2", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 21 + (i * 23), productNames: namesObject[21 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8x5x2", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 22 + (i * 23), productNames: namesObject[22 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12x6x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1},
    {identifier: 23 + (i * 23), productNames: namesObject[23 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12x6x4", uuid: faker.random.uuid(), lastUpdated: currenttime, userId: i+1}
    )
  }
  return renderedRecords
}


exports.seed = function(knex, Promise) {
  return db("productPackages")
  .select("productPackages.pendingShipmentsId", "products.name")
  .join("products", "productPackages.productId", "=", "products.identifier")
  .then(nameObjectArray => {
    const namesObject = {}
    nameObjectArray.forEach(nameObject => {
      if (!namesObject[nameObject.pendingShipmentsId]) {
        namesObject[nameObject.pendingShipmentsId] = []
      }
      namesObject[nameObject.pendingShipmentsId].push(nameObject.name);
    })
    return knex('pendingShipments').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('pendingShipments').insert(
        renderRecords(namesObject)
      );
    });
  })
}
