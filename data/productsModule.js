const db = require("../data/dbConfig.js");

module.exports = {
  getProducts,
  addProduct
};

function getProducts(userId) {
  return db("products").where({ userId });
}

async function addProduct(product, userId) {
  const [id] = await db("products").insert({
    ...product,
    userId: userId
  });
  return findById("products", id);
  // return db("products").where({ userId });
}

function findById(table, identifier) {
  return db(`${table}`)
    .where({ identifier })
    .first();
}
