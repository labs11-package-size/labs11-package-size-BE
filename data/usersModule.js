const db = require("../data/dbConfig.js");

module.exports = {
  findUsername,
  addUser
};

function findUsername(username) {
    return db("users")
    .where("username", username)
  }

async function addUser(user) {
    const [id] = await db("users").insert(user);
    return findById("users", id);
}

function findById(table, identifier) {
    return db(`${table}`)
      .where({ identifier })
      .first();
  }