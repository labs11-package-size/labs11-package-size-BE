const db = require("../data/dbConfig.js");

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct
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

async function deleteProduct(identifier, userId){
  const deleted = await db("products").where({ identifier }).del()
    if (deleted) return getProducts(userId)
    return null;
}

async function editProduct(identifier, userId, changes){
  const edited = await db('products').where({ identifier }).update({...changes, userId})
  if (edited) return getProducts(userId)
  return null;


}

function findById(table, identifier) {
  return db(`${table}`)
    .where({ identifier })
    .first();
}
