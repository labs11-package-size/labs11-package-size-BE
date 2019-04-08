const db = require("../data/dbConfig.js");
const moment = require("moment");
const uuidTimestamp = require("uuid/v1")

module.exports = {
  getPackages,
  deletePackage,
  addPackages
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

function addPackages(request, userId) {
  const currentDate = moment().format("YYYY-MM-DD hh:mm:ss");
  // const modelQueryBuilder = () => {

  // }
  // const urlString 
  return db('pendingShipments').insert({
    productNames: namesString,
    modelURL: urlString,
    dimensions: request.size,
    totalWeight: request.curr_weight,
    uuid: uuidTimestamp(),
    lastUpdated: currentDate,
    userId
  })

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
