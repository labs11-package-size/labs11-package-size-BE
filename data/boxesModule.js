const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1");

module.exports = {
  getBoxes
};

function getBoxes() {
  return db("boxes")
    .select("identifier", "dimensions")
    .where("custom", false);
}
