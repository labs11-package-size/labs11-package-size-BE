const faker = require("faker");
const moment = require('moment')

const fakerShipments = () => {
  const currenttime = moment().format("YYYY-MM-DD hh:mm:ss")
  let productsArray = [];
  for (u = 3; u <= 5; u++) {
    for (p = 1; p <= 23; p++) {
      productsArray.push({
        identifier: (p + u * 23),
        dateShipped: moment(faker.date.past()).format("YYYY-MM-DD"),
        shippedTo: `${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
        status: Math.floor(Math.random() * (5)) + 1,
        uuid: faker.random.uuid(),
        productId: (p + u * 23),
        productName: faker.commerce.productName(),
        lastUpdated: currenttime
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
