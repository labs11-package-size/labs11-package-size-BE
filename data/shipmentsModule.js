const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1")
const productsdb = require("../data/productsModule.js");
const moment = require("moment")

module.exports = {
  getShipments,
  addShipment,
  deleteShipment,
  editShipment
};

function getShipments(userId) {
  return db("shipments")
    .select("shipments.*")
    .join("products", "shipments.productId", "=", "products.identifier")
    .where({ userId });
}

async function addShipment(shipment, userId) {
  await db("shipments").insert({
    ...shipment,
    uuid: uuidTimestamp()
  });
  return getShipments(userId);
}

async function deleteShipment(identifier, userId) {
  const deleted = await db("shipments")
    .where({ identifier })
    .del();
  if (deleted) return getShipments(userId);
  return null;
}

async function editShipment(identifier, userId, changes, productId) {
  const currentDate = moment().format("YYYY-MM-DD hh:mm:ss")
  const productName = await productsdb.getProductName(productId)
  const edited = await db("shipments")
    .where({ identifier })
    .update({...changes, productName: productName.name, lastUpdated: currentDate});
  if (edited) return getShipments(userId);
  return null;
}

function findById(table, identifier) {
  return db(`${table}`)
    .where({ identifier })
    .first();
}
