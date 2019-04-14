const db = require("../data/dbConfig.js");
const uuidTimestamp = require("uuid/v1");

module.exports = {
  getBoxes
};

function getBoxes(boxType) {
  if (boxType) {
    return db("boxes")
    .select("identifier", "dimensions")
    .where("custom", false)
    .andWhere("boxType", boxType)
  }
  return db("boxes")
    .select("identifier", "dimensions")
    .where("custom", false);
}
