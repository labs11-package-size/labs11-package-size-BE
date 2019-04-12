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
      "totalWeight",
      "modelURL",
      "uuid",
      "dimensions",
      "productNames",
      "lastUpdated",
      "productUuids"
    )
    .where({ userId })
    .then(found => {
      return found.map(pendingShipment => {
        pendingShipment.productNames = pendingShipment.productNames.split(", ");
        pendingShipment.productUuids = pendingShipment.productUuids.split(",")
        return pendingShipment;
      });
    });
}

async function addPackages(request, userId) {
  if (Array.isArray(request)) {
    await request.forEach(previewObject => addFunc(previewObject, userId));
    return getPackages(userId);
  } else {
    await addFunc(request, userId);
    return getPackages(userId);
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
  const itemCount = {}
  itemIds.forEach(itemIdentifier => {
    if (!itemCount[itemIdentifier]) {
      itemCount[itemIdentifier] = 0;
    }
    itemCount[itemIdentifier]++
  })
  return db("products")
    .select("identifier", "name", "uuid")
    .whereIn("identifier", itemIds)
    .then(namesObjects => {
      const uuidsArray = [];
      const namesArray = [];
      console.log(itemCount)
      namesObjects.forEach(nameObject => {
        if (itemCount[nameObject.identifier] > 1) {
          nameObject.name = `${nameObject.name} (x${itemCount[nameObject.identifier]})`
          for (let i = 1; i < itemCount[nameObject.identifier]; i++) {
            uuidsArray.push(nameObject.uuid)
          }
        }
        uuidsArray.push(nameObject.uuid)
        namesArray.push(nameObject.name);
      });
      const currentDate = moment().format("YYYY-MM-DD hh:mm:ss");
      return db("pendingShipments").insert({
        productNames: namesArray.join(", "),
        productUuids: uuidsArray.join(),
        dimensions: binObject.size,
        totalWeight: binObject.curr_weight,
        uuid: uuidTimestamp(),
        lastUpdated: currentDate,
        modelURL: binObject.modelURL,
        userId
      });
    });
}

async function deletePackage(uuid, userId) {
  if (uuid.length > 50) {
    const uuidArray = await uuid.split(",");
    const deleted = await db("pendingShipments")
      .whereIn("uuid", uuidArray)
      .andWhere({ userId })
      .del();
    if (deleted) return getPackages(userId);
    return null;
  } else {
    const deleted = await db("pendingShipments")
      .where({ uuid })
      .andWhere({ userId })
      .del();
    if (deleted) return getPackages(userId);
    return null;
  }
}
