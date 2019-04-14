const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1")

module.exports = {
  findUid,
  addUser,
  getUser,
  editUser
};

function findUid(uid) {
  return db("users").where({ uid })
}

async function addUser(firebaseUser) {
  const [id] = await db("users").insert({
    ...firebaseUser,
    uuid: uuidTimestamp()
  });
  return findById("users", id);
}

function getUser(identifier) {
  return findById("users", identifier);
}

async function editUser(identifier, changes) {
  const edited = await db("users")
    .where({ identifier })
    .update(changes);
  if (edited) return getUser(identifier);
  return null;
}

function findById(table, identifier) {
  return db(`${table}`)
    .where({ identifier })
    .first();
}
