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
  .join("products", "shipments.productId", "=", "products.identifier")
  .where({ userId })
}

async function addShipment(shipment) {
  const [id] = await db("shipments").insert(shipment);
  return getShipments(userId)
}

async function deleteShipment(identifier, userId) {
    const deleted = await db("shipments").where({ identifier }).del()
    if (deleted) return getShipments(userId)
    return null;
}

async function editShipment(identifier, userId, changes) {
    const edited = await db('shipments').where({ identifier }).update(changes)
    if (edited) return getShipments(userId)
    return null;
}

function findById(table, identifier) {
    return db(`${table}`)
      .where({ identifier })
      .first();
  }