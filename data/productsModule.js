const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1");
const moment = require("moment");

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  getAssets,
  addAsset,
  getProductName,
  getDimensions,
  getUUIDs,
  getProductNames
};

function getProducts(userId) {
  const list = db("products")
    .select(
      "identifier",
      "name",
      "productDescription",
      "weight",
      "value",
      "length",
      "width",
      "height",
      "manufacturerId",
      "fragile",
      "thumbnail",
      "uuid",
      "lastUpdated",
      "images"
    )
    .where({ userId })
	.limit(20);

  return db("products")
    .select(
      "identifier",
      "name",
      "productDescription",
      "weight",
      "value",
      "length",
      "width",
      "height",
      "manufacturerId",
      "fragile",
      "thumbnail",
      "uuid",
      "lastUpdated",
      "images"
    )
    .where({ userId })

    .offset(list.length)
    .then(productsArray => {
      return productsArray.map(productObject => {
        productObject.images = productObject.images.split(",");
        return productObject;
      });
    });
}

async function addProduct(product, userId, images) {
  const currentDate = await moment().format("YYYY-MM-DD hh:mm:ss");
  if (images) {
    await db("products").insert({
      ...product,
      userId: userId,
      uuid: uuidTimestamp(),
      lastUpdated: currentDate,
      images: product.images.join()
    });
  } else {
    await db("products").insert({
      ...product,
      userId: userId,
      uuid: uuidTimestamp(),
      lastUpdated: currentDate
    });
  }
  return getProducts(userId);
}

function getProductName(identifier) {
  return db("products")
    .where({ identifier })
    .first();
}

function getProductNames(array) {
  return db("products")
    .select("name", "identifier")
    .whereIn("identifier", array);
}

async function deleteProduct(uuid, userId) {
  const deleted = await db("products")
    .where({ uuid })
    .andWhere({ userId })
    .del();
  if (deleted) return getProducts(userId);
  return null;
}

async function editProduct(uuid, userId, changes, images) {
  const currentDate = await moment().format("YYYY-MM-DD hh:mm:ss");
  if (images) {
    const edited = await db("products")
      .where({ uuid })
      .update({ ...changes, lastUpdated: currentDate, images: images.join() });
    if (edited) return getProducts(userId);
  } else {
    const edited = await db("products")
      .where({ uuid })
      .update({ ...changes, lastUpdated: currentDate });
    if (edited) return getProducts(userId);
  }
  return null;
}

async function getAssets(uuid) {
  const found = await db("productAssets")
    .select("productAssets.*")
    .where("products.uuid", uuid)
    .join("products", "products.identifier", "=", "productAssets.productId");
  if (found) return found;
  return null;
}

async function addAsset(uuid, request) {
  const found = await db("products")
    .where({ uuid })
    .first();
  if (found) {
    const [id] = await db("productAssets").insert({
      ...request,
      productId: found.identifier,
      uuid: uuidTimestamp()
    });
    return findById("productAssets", id);
  }
  return null;
}

function getDimensions(uuidarray) {
  return db("products")
    .select("identifier", "length", "width", "height", "weight", "uuid")
    .whereIn("uuid", uuidarray);
}

function findById(table, identifier) {
  return db(`${table}`)
    .where({ identifier })
    .first();
}

function getUUIDs(eachItem) {
  return db("products")
    .select("identifier", "uuid")
    .whereIn("identifier", eachItem);
}
