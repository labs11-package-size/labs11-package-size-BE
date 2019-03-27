const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1")
const moment = require("moment");

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  getAssets,
  addAsset,
  getProductName
};

function getProducts(userId) {
  return db("products").where({ userId });
}

async function addProduct(product, userId) {
  const currentDate = await moment().format("YYYY-MM-DD hh:mm:ss")
  await db("products").insert({
    ...product,
    userId: userId,
    uuid: uuidTimestamp(),
    lastUpdated: currentDate
  });
  return getProducts(userId)
  // return db("products").where({ userId });
}

function getProductName(identifier) {
  return db("products").where({ identifier }).first()
}

async function deleteProduct(identifier, userId){
  const deleted = await db("products").where({ identifier }).del()
    if (deleted) return getProducts(userId)
    return null;
}

async function editProduct(identifier, userId, changes){
  const currentDate = await moment().format("YYYY-MM-DD hh:mm:ss")
  const edited = await db('products').where({ identifier }).update({...changes, userId, lastUpdated: currentDate})
  if (edited) return getProducts(userId)
  return null;
}

async function getAssets(identifier) {
  const found = await db("productassets").where({ identifier })
  if (found) return found
  return null;
}

async function addAsset(identifier, request) {
  const found = await db("products").where({ identifier })
  if (found) return db("productassets").insert({
    ...request,
    productId: identifier,
    uuid: uuidTimestamp()
  })
  return null;
}

function findById(table, identifier) {
  return db(`${table}`)
    .where({ identifier })
    .first();
}
