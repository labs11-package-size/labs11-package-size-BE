const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1");
const productsdb = require("../data/productsModule.js");
const moment = require("moment");

module.exports = {
  getShipments,
  getAllShipments,
  addShipment,
  deleteShipment,
  editShipment,
};

function getShipments(userId) {
  return db("shipments")
    .select(
      "tracked",
      "modelURL",
      "dateShipped",
      "dateArrived",
      "productNames",
      "productUuids",
      "totalWeight",
      "shippedTo",
      "trackingNumber",
      "carrierName",
      "shippingType",
      "dimensions",
      "status",
      "uuid",
      "lastUpdated",
    )
    .where({ userId })
    .then(shipmentsArray => {
      return shipmentsArray.map(shipmentObject => {
        shipmentObject.productNames = shipmentObject.productNames.split(",");
        shipmentObject.productUuids = shipmentObject.productUuids.split(",");
        return shipmentObject;
      });
    });
}

function getAllShipments(userId) {
  return db("pendingShipments")
  .select(
    "tracked",
    "totalWeight",
    "modelURL",
    "dimensions",
    "productUuids",
    "productNames",
    "uuid",
    "lastUpdated"
  )
  .where({ userId })
  .then(foundPackages => {
    const parsedPackages = foundPackages.map(packageObject => {
      packageObject.productNames = packageObject.productNames.split(",");
      packageObject.productUuids = packageObject.productUuids.split(",");
      return packageObject
    })

  return db("shipments")
    .select(
      "tracked",
      "modelURL",
      "dateShipped",
      "dateArrived",
      "productNames",
      "productUuids",
      "totalWeight",
      "shippedTo",
      "trackingNumber",
      "carrierName",
      "shippingType",
      "dimensions",
      "status",
      "uuid",
      "lastUpdated",
    )
    .where({ userId })
    .then(shipmentsArray => {
      const parsedShipments = shipmentsArray.map(shipmentObject => {
        shipmentObject.productNames = shipmentObject.productNames.split(",");
        shipmentObject.productUuids = shipmentObject.productUuids.split(",");
        return shipmentObject;
      });
      return parsedPackages.concat(parsedShipments)
    });
  })
}

async function addShipment(shipment, userId) {
  await db("shipments").insert({
    ...shipment,
    uuid: uuidTimestamp()
  });
  return getShipments(userId);
}

async function deleteShipment(uuid, userId) {
  if (uuid.length > 50) {
    const uuidArray = await uuid.split(',')
    const deleted = await db("shipments")
    .whereIn("uuid", uuidArray)
    .andWhere({ userId })
    .del();
    if (deleted) return getShipments(userId)
    return null
  }
  else {
  const deleted = await db("shipments")
    .where({ uuid })
    .andWhere({ userId })
    .del();
  if (deleted) return getShipments(userId);
  return null;
}
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
