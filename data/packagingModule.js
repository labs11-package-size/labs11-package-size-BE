const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1");

module.exports = {
  getPackages,
  deletePackage
};

function getPackages(userId) {
  return db("pendingShipments")
    .select(
      "pendingShipments.totalWeight",
      "pendingShipments.modelURL",
      "pendingShipments.uuid",
      "pendingShipments.dimensions",
      "pendingShipments.productNames",
      "pendingShipments.lastUpdated"
    )
    .where("pendingShipments.userId", userId)
    .then(found => {
      return found.map(pendingShipment => {
        pendingShipment.productNames = pendingShipment.productNames.split(",");
        return pendingShipment;
      });
    });
}

function deletePackage(uuid, userId) {
  return db("pendingShipments")
    .where({ uuid })
    .andWhere({ userId })
    .del()
    .then(deleted => {
      if (deleted) {
        return getPackages(userId);
      }
      return null;
    });
}
