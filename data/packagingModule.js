const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1");

module.exports = {
  getPackages
};

function getPackages(userId) {
  return db("pendingShipments")
    .select("pendingShipments.*", "products.name", "boxes.dimensions")
    .join(
      "productPackages",
      "pendingShipments.identifier",
      "=",
      "productPackages.pendingShipmentsId"
    )
    .join("products", "productPackages.productId", "=", "products.identifier")
    .join("boxes", "pendingShipments.boxId", "=", "boxes.identifier")
    .where({ userId })
    .then(found => {
      const nameHolder = {};
      found.forEach(packageObject => {
        if (!nameHolder[packageObject.identifier]) {
          nameHolder[packageObject.identifier] = [];
        }
        {
          nameHolder[packageObject.identifier].push(packageObject.name);
        }
      });
      console.log(nameHolder);
      const idCount = {};
      const result = [];
      found.forEach(packageObject => {
        const copyObject = { ...packageObject };
        if (!idCount[copyObject.identifier]) {
          console.log("running");
          delete copyObject.name;
          delete copyObject.boxId;
          copyObject.productNames = nameHolder[copyObject.identifier];
          idCount[copyObject.identifier] = 1;
          result.push(copyObject);
        }
      });
      return result;
    });
}
