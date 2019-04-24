const faker = require("faker");
const moment = require('moment')
const uuidTimestamp = require("uuid/v1")
const db = require("../dbConfig.js");

const fakerShipments = (namesObject, uuidObject) => {
  const currenttime = moment().format("YYYY-MM-DD hh:mm:ss")
  let productsArray = [];
    for (p = 1; p <= 5; p++) {
      productsArray.push({
        identifier: 500+p,
        tracked: true,
        dateShipped: moment(faker.date.past()).format("YYYY-MM-DD"),
        dateArrived: moment(faker.date.past()).format("YYYY-MM-DD"),
        shippedTo: "Rowland Heights, CA 91748",
        status: Math.floor(Math.random() * (5)) + 1,
        uuid: uuidTimestamp(),
        lastUpdated: currenttime,
        userId: 501,
        dimensions: "8 x 6 x 4",
        trackingNumber: "9534612116879084152017",
        productNames: namesObject[500+p].join(),
        productUuids: uuidObject[500+p].join(),
        carrierName: "USPS"
      });
    }
    return productsArray;
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
    return knex('shipments')
    .then(() => {
      // Inserts seed entries
      return knex('shipments').insert(
        fakerShipments(namesObject, uuidObject)
      );
    });
  })
}
