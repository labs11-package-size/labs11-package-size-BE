const faker = require("faker");
const moment = require('moment')

const fakerProducts = () => {
  const currenttime = moment().format("YYYY-MM-DD hh:mm:ss")
  let productsArray = [];
  for (u = 0; u <= 2; u++) {
    for (p = 1; p <= 23; p++) {
      productsArray.push({
        identifier: (p + u * 23),
        name: faker.commerce.productName(),
        productDescription: faker.lorem.paragraph(),
        length: Math.floor(Math.random() * (10)) + 1,
        width: Math.floor(Math.random() * (10)) + 1,
        height: Math.floor(Math.random() * (5)) + 1,
        weight: Math.floor(Math.random() * (20)) + 1,
        value: faker.commerce.price(),
        userid: (u + 1),
        uuid: faker.random.uuid(),
        lastUpdated: currenttime
      });
    }
  }
  return productsArray;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert(fakerProducts());
    });
};
