const faker = require("faker");

const fakerShipments = () => {
  let productsArray = [];
  for (u = 0; u <= 5; u++) {
    for (p = 1; p <= 23; p++) {
      productsArray.push({
        identifier: (p + u * 23),
        dateShipped: faker.date.past(),
        shippedTo: `${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
        status: (Math.floor(Math.random() * (4)) + 1),
        uuid: faker.random.uuid(),
        productId: (p + u * 23),
        productName: faker.commerce.productName()
      });
    }
  }
  return productsArray;
};



exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shipments').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('shipments').insert(fakerShipments());
    });
};
