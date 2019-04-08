const db = require("../data/dbConfig.js");
const moment = require("moment");
const uuidTimestamp = require("uuid/v1");

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

async function addPackages(request, userId) {
  if (Array.isArray(request)) {
    await request.forEach(previewObject => addFunc(previewObject, userId));
    return getPackages(userId)
  } else {
    await addFunc(request, userId);
    return getPackages(userId)
  }
}

function addFunc(binObject, userId) {
  const itemIds = binObject.items.map(item => {
    if (item.id.length > 2) {
      if (item.id.lastIndexOf("0") === item.id.length - 2) {
        return item.id.slice(item.id.length - 1);
      } else {
        return item.id.slice(item.id.length - 2);
      }
    } else {
      return item.id;
    }
  });
  return db("products")
    .select("name")
    .whereIn("identifier", itemIds)
    .then(namesObjects => {
      const currentDate = moment().format("YYYY-MM-DD hh:mm:ss");
      //   http://www.packit4me.com/api/call/preview?bins=0:100:10x8x4&items=12:0:9:3x10x4,
      // 6:0:17:4x5x5,3:0:2:3x5x5&binId=0
      const modelQueryBuilder = () => {
        const itemsMapped = binObject.items.map(itemObject => {
          return `${itemObject.id}:0:${itemObject.weight}:${
            itemObject.size_1
          }x${itemObject.size_2}x${itemObject.size_3}`;
        });
        return `bins=${binObject.id}:${binObject.weight_limit}:${
          binObject.size_1
        }x:${binObject.size_2}x:${
          binObject.size_3
        }&items=${itemsMapped.join()}`;
      };
      const urlString = `https://scannarserver.herokuapp.com/api/packaging/getModel/${modelQueryBuilder()}`;
      const namesArray = [];
      namesObjects.forEach(nameObject => {
        namesArray.push(nameObject.name);
      });
      return db("pendingShipments").insert({
        productNames: namesArray.join(),
        modelURL: urlString,
        dimensions: binObject.size,
        totalWeight: binObject.curr_weight,
        uuid: uuidTimestamp(),
        lastUpdated: currentDate,
        userId
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
