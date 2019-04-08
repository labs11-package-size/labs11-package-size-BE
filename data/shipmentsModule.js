const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1");
const productsdb = require("../data/productsModule.js");
const moment = require("moment");

module.exports = {
  getShipments,
  addShipment,
  deleteShipment,
  editShipment
};

function getShipments(userId) {
  return db("shipments")
    .select(
      "dateShipped",
      "dateArrived",
      "productNames",
      "totalWeight",
      "shippedTo",
      "trackingNumber",
      "carrierName",
      "shippingType",
      "dimensions",
      "status",
      "uuid",
      "lastUpdated"
    )
    .where({ userId })
    .then(shipmentsArray => {
      return shipmentsArray.map(shipmentObject => {
        shipmentObject.productNames = shipmentObject.productNames.split(",");
        return shipmentObject;
      });
    });
}

async function addShipment(shipment, userId) {
  await db("shipments").insert({
    ...shipment,
    uuid: uuidTimestamp()
  });
  return getShipments(userId);
}

async function deleteShipment(uuid, userId) {
  const deleted = await db("shipments")
    .where({ uuid })
    .del();
  if (deleted) return getShipments(userId);
  return null;
}

async function editShipment(uuid, userId, changes, productId) {
  const currentDate = await moment().format("YYYY-MM-DD hh:mm:ss");
  const productName = await productsdb.getProductName(productId);
  const edited = await db("shipments")
    .where({ uuid })
    .update({
      ...changes,
      productName: productName.name,
      lastUpdated: currentDate
    });
  if (edited) return getShipments(userId);
  return null;
}

function findById(table, identifier) {
  return db(`${table}`)
    .where({ identifier })
    .first();
}
