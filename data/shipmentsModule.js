const db = require("../data/dbConfig.js");

module.exports = {
  getShipments,
  addShipment,
  deleteShipment,
  editShipment
};

function getShipments(userId) {
  return db("shipments")
  .select("shipments.*")
  .join("products")
  .where({ userId });

}

async function addFromTracking(product, userId) {
  const [id] = await db("shipments").insert({
    ...shipment,
    userId: userId
  });
  return findById("shipments", id);
  // return db("shipments").where({ userId });
}

async function addShipment(product, userId) {
  const [id] = await db("shipments").insert({
    ...shipment,
    userId: userId
  });
  return findById("shipments", id);
  // return db("shipments").where({ userId });
}

function findById(table, identifier) {
  return db(`${table}`)
    .where({ identifier })
    .first();
}
