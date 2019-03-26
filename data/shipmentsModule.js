const db = require("../data/dbConfig.js");

module.exports = {
  getShipments,
  addShipment,
//   deleteShipment,
//   editShipment
};

function getShipments(userId) {
  return db("shipments")
  .select("shipments.*")
  .join("products")
  .where({ userId });
}

async function addShipment(shipment, userId) {
  const [id] = await db("shipments").insert(shipment);
  return findById("shipments", id);
  // return db("shipments").where({ userId });
}

function findById(table, identifier) {
  return db(`${table}`)
    .where({ identifier })
    .first();
}
