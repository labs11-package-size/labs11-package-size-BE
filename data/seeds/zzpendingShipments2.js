
const moment = require('moment')
const db = require("../dbConfig.js");
const uuidTimestamp = require("uuid/v1")

const renderRecords = (namesObject, uuidObject) => {
  const currenttime = moment().format("YYYY-MM-DD hh:mm:ss")
  const renderedRecords = []
  for (i = 1; i <= 5; i++) {
    renderedRecords.push({identifier: 500+i, tracked: false, productNames: namesObject[500+i].join() , modelURL: "http://www.google.com", dimensions:"12 x 6 x 4", uuid: uuidTimestamp(), lastUpdated: currenttime, userId: 501, productUuids: uuidObject[500+i].join() })
     } return renderedRecords}

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
        return knex('pendingShipments')
        .then(() => {
          // Inserts seed entries
          return knex('pendingShipments').insert(
            renderRecords(namesObject, uuidObject)
          );
        });
      })
    }
