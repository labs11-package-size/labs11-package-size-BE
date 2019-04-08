const moment = require('moment')
const db = require("../dbConfig.js");
const uuidTimestamp = require("uuid/v1")


const renderRecords = (namesObject) => {
  const currenttime = moment().format("YYYY-MM-DD hh:mm:ss")
  const renderedRecords = []
  for (i = 0; i < 5; i++) {
    renderedRecords.push({identifier: 1 + (i * 23), productNames: namesObject[1 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 2 + (i * 23), productNames: namesObject[2 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"7 x 5.5 x 1.25", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 3 + (i * 23), productNames: namesObject[3 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"7 x 5.5 x 1.25", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 4 + (i * 23), productNames: namesObject[4 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10 x 8 x 6", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 5 + (i * 23), productNames: namesObject[5 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10 x 10 x 10", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 6 + (i * 23), productNames: namesObject[6 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 12 x 8", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 7 + (i * 23), productNames: namesObject[7 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"9 x 6 x 3", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 8 + (i * 23), productNames: namesObject[8 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 9 + (i * 23), productNames: namesObject[9 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12.5 x 10 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 10 + (i * 23), productNames: namesObject[10 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 11 + (i * 23), productNames: namesObject[11 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 12 + (i * 23), productNames: namesObject[12 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12.5 x 10 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 13 + (i * 23), productNames: namesObject[13 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 14 + (i * 23), productNames: namesObject[14 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 15 + (i * 23), productNames: namesObject[15 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10 x 10 x 10", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 16 + (i * 23), productNames: namesObject[16 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 17 + (i * 23), productNames: namesObject[17 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 18 + (i * 23), productNames: namesObject[18 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 19 + (i * 23), productNames: namesObject[19 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10 x 10 x 10", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 20 + (i * 23), productNames: namesObject[20 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 21 + (i * 23), productNames: namesObject[21 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 22 + (i * 23), productNames: namesObject[22 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1},
    {identifier: 23 + (i * 23), productNames: namesObject[23 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1}
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
