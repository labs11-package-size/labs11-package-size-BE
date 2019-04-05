const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1")

module.exports = {
    getPendingShipments
}

function getPendingShipments(userId) {
    return db("pendingShipments")
    .select("pendingShipments.*")
    .join("productPackages", "pendingShipments.identifier", "=", "productPackages.pendingShipmentsId")
    .join("products", "productPackages.productId", "=", "products.identifier")
    .where({ userId });
}