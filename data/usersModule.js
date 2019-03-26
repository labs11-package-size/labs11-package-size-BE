const db = require("../data/dbConfig.js");

module.exports = {
  findUsername,
  addUser,
  getUser,
  editUser
};

function findUsername(username) {
    return db("users")
    .where("username", username)
  }

async function addUser(user) {
    const [id] = await db("users").insert(user);
    return findById("users", id);
}

function getUser(identifier) {
  return findById("users", identifier)
}

async function editUser(identifier, changes){
  const edited = await db('users').where({ identifier }).update(changes)
  if (edited) return getUser(identifier)
  return null;
}

function findById(table, identifier) {
    return db(`${table}`)
      .where({ identifier })
      .first();
  }