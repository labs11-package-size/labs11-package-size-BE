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
        pendingShipment.productUuids = pendingShipment.productUuids.split(",");
        return pendingShipment;
      });
    });
}

function addPackages(request, userId) {
  if (Array.isArray(request)) {
    return addFuncArray(request, userId);
  } else {
    return addFunc(request, userId);
  }
}

function addFuncArray(binObjects, userId) {
  console.log("addFuncArray")
  let binObjectsArray = [];
  const currentDate = moment().format("YYYY-MM-DD hh:mm:ss");
  binObjects.forEach(binObject => {
    const itemIds = binObject.items.map(item => {
     return idParser(item.id);
    });
    console.log("itemIds", itemIds)
    const itemCount = {};
    itemIds.forEach(itemIdentifier => {
      if (!itemCount[itemIdentifier]) {
        itemCount[itemIdentifier] = 0;
      }
      itemCount[itemIdentifier]++;
    });
    db("products")
      .select("identifier", "name", "uuid")
      .whereIn("identifier", itemIds)
      .then(namesObjects => {
        const uuidsArray = [];
        const namesArray = [];
        namesObjects.forEach(nameObject => {
          if (itemCount[nameObject.identifier] > 1) {
            nameObject.name = `${nameObject.name} (x${
              itemCount[nameObject.identifier]
            })`;
            for (let i = 1; i < itemCount[nameObject.identifier]; i++) {
              uuidsArray.push(nameObject.uuid);
            }
          }
          uuidsArray.push(nameObject.uuid);
          namesArray.push(nameObject.name);
        });
        binObjectsArray.push({
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
  });
  return db("pendingShipments").insert(binObjectsArray).then(() => {return getPackages(userId)});
}

function addFunc(binObject, userId) {
  const itemIds = binObject.items.map(item => {
    item.id = idParser(item.id);
  });
  const itemCount = {};
  itemIds.forEach(itemIdentifier => {
    if (!itemCount[itemIdentifier]) {
      itemCount[itemIdentifier] = 0;
    }
    itemCount[itemIdentifier]++;
  });
  return db("products")
    .select("identifier", "name", "uuid")
    .whereIn("identifier", itemIds)
    .then(namesObjects => {
      const uuidsArray = [];
      const namesArray = [];
      namesObjects.forEach(nameObject => {
        if (itemCount[nameObject.identifier] > 1) {
          nameObject.name = `${nameObject.name} (x${
            itemCount[nameObject.identifier]
          })`;
          for (let i = 1; i < itemCount[nameObject.identifier]; i++) {
            uuidsArray.push(nameObject.uuid);
          }
        }
        uuidsArray.push(nameObject.uuid);
        namesArray.push(nameObject.name);
      });
      const currentDate = moment().format("YYYY-MM-DD hh:mm:ss");
      return db("pendingShipments")
        .insert({
          productNames: namesArray.join(", "),
          productUuids: uuidsArray.join(),
          dimensions: binObject.size,
          totalWeight: binObject.curr_weight,
          uuid: uuidTimestamp(),
          lastUpdated: currentDate,
          modelURL: binObject.modelURL,
          userId
        })
        .then(() => getPackages(userId));
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

const idParser = itemId => {
  if (itemId.length === 5) {
    if (itemId.indexOf("0") === 1) {
      let firstCut = itemId.slice(2);
      if (firstCut[0] === "0") {
        let secondCut = firstCut.slice(1);
        if (secondCut[0] === "0") {
          return secondCut.slice(1);
        }
        return secondCut;
      }
      return firstCut;
    }
    return itemId.slice(1);
  }
  if (itemId.length === 6) {
    if (itemId.indexOf("0") === 1) {
      let firstCut = itemId.slice(2);
      if (firstCut[0] === "0") {
        let secondCut = firstCut.slice(1);
        if (secondCut[0] === "0") {
          let thirdCut = secondCut.slice(1);
          if (thirdCut[0] === "0") {
            return thirdCut.slice(1);
          }
          return thirdCut;
        }
        return secondCut;
      }
      return firstCut;
    }
    return itemId.slice(2);
  } else {
    return itemId;
  }
};
