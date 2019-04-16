const moment = require('moment')
const db = require("../dbConfig.js");
const uuidTimestamp = require("uuid/v1")


const renderRecords = (namesObject, uuidObject) => {
  const currenttime = moment().format("YYYY-MM-DD hh:mm:ss")
  const renderedRecords = []
  for (i = 0; i < 5; i++) {
    renderedRecords.push({identifier: 1 + (i * 23), productNames: namesObject[1 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[1 + (i*23)].join() },
    {identifier: 2 + (i * 23), productNames: namesObject[2 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"7 x 5.5 x 1.25", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[2 + (i*23)].join() },
    {identifier: 3 + (i * 23), productNames: namesObject[3 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"7 x 5.5 x 1.25", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[3 + (i*23)].join() },
    {identifier: 4 + (i * 23), productNames: namesObject[4 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10 x 8 x 6", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[4 + (i*23)].join() },
    {identifier: 5 + (i * 23), productNames: namesObject[5 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10 x 10 x 10", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[5 + (i*23)].join() },
    {identifier: 6 + (i * 23), productNames: namesObject[6 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 12 x 8", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[6 + (i*23)].join() },
    {identifier: 7 + (i * 23), productNames: namesObject[7 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"9 x 6 x 3", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[7 + (i*23)].join() },
    {identifier: 8 + (i * 23), productNames: namesObject[8 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[8 + (i*23)].join() },
    {identifier: 9 + (i * 23), productNames: namesObject[9 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12.5 x 10 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[9 + (i*23)].join() },
    {identifier: 10 + (i * 23), productNames: namesObject[10 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[10 + (i*23)].join() },
    {identifier: 11 + (i * 23), productNames: namesObject[11 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[11 + (i*23)].join() },
    {identifier: 12 + (i * 23), productNames: namesObject[12 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12.5 x 10 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[12 + (i*23)].join() },
    {identifier: 13 + (i * 23), productNames: namesObject[13 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[13 + (i*23)].join() },
    {identifier: 14 + (i * 23), productNames: namesObject[14 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[14 + (i*23)].join() },
    {identifier: 15 + (i * 23), productNames: namesObject[15 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10 x 10 x 10", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[15 + (i*23)].join() },
    {identifier: 16 + (i * 23), productNames: namesObject[16 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[16 + (i*23)].join() },
    {identifier: 17 + (i * 23), productNames: namesObject[17 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[17 + (i*23)].join() },
    {identifier: 18 + (i * 23), productNames: namesObject[18 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[18 + (i*23)].join() },
    {identifier: 19 + (i * 23), productNames: namesObject[19 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"10 x 10 x 10", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[19 + (i*23)].join() },
    {identifier: 20 + (i * 23), productNames: namesObject[20 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[20 + (i*23)].join() },
    {identifier: 21 + (i * 23), productNames: namesObject[21 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"8 x 5 x 2", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[21 + (i*23)].join() },
    {identifier: 22 + (i * 23), productNames: namesObject[22 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[22 + (i*23)].join() },
    {identifier: 23 + (i * 23), productNames: namesObject[23 + (i*23)].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: i+1, productUuids: uuidObject[23 + (i*23)].join() }
    )
  }
  return renderedRecords
}


exports.seed = function(knex, Promise) {
  return db("productPackages")
  .select("productPackages.pendingShipmentsId", "products.name", "products.uuid")
  .join("products", "productPackages.productId", "=", "products.identifier")
  .then(nameObjectArray => {
    const namesObject = {}
    const uuidObject = {}
    nameObjectArray.forEach(nameObject => {
      if (!namesObject[nameObject.pendingShipmentsId]) {
        namesObject[nameObject.pendingShipmentsId] = []
      }
      namesObject[nameObject.pendingShipmentsId].push(nameObject.name);
      if (!uuidObject[nameObject.pendingShipmentsId]) {
        uuidObject[nameObject.pendingShipmentsId] = []
      }
      uuidObject[nameObject.pendingShipmentsId].push(nameObject.uuid)
    })
    return knex('pendingShipments').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('pendingShipments').insert(
        renderRecords(namesObject, uuidObject)
      );
    });
  })
}
