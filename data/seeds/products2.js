const faker = require("faker");

const fakerProducts = () => {
  let productsArray = [];
  for (u = 3; u <= 5; u++) {
    for (p = 1; p <= 23; p++) {
      productsArray.push({
        identifier: (p + u * 23),
        name: faker.commerce.productName(),
        productDescription: faker.lorem.paragraph(),
        length: Math.floor(Math.random() * (10)) + 1,
        width: Math.floor(Math.random() * (10)) + 1,
        height: Math.floor(Math.random() * (10)) + 1,
        weight: Math.floor(Math.random() * (20)) + 1,
        value: faker.commerce.price(),
        userid: (u + 1),
        uuid: faker.random.uuid()
      });
    }
  }
  return productsArray;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .then(function() {
      // Inserts seed entries
      return knex("products").insert(fakerProducts());
    });
};
