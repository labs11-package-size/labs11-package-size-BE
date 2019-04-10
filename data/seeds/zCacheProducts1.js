const faker = require("faker");
const moment = require('moment')
const uuidTimestamp = require("uuid/v1")

const fakerProducts = () => {
  const currenttime = moment().format("YYYY-MM-DD hh:mm:ss")
  let productsArray = [];
  for (i = 282; i < 364; i++) {
      productsArray.push({
        identifier: i,
        name: faker.commerce.productName(),
        productDescription: faker.lorem.paragraph(),
        length: Math.floor(Math.random() * (10)) + 1,
        width: Math.floor(Math.random() * (10)) + 1,
        height: Math.floor(Math.random() * (10)) + 1,
        weight: Math.floor(Math.random() * (20)) + 1,
        value: faker.commerce.price(),
        userid: 4,
        uuid: uuidTimestamp(),
        lastUpdated: currenttime,
        thumbnail: `https://res.cloudinary.com/https-scannarserver-herokuapp-com/image/upload/c_scale,w_300/v1554672388/Product%20Assets/product${Math.floor(Math.random() * (10)) + 1}.jpg`
      });  
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
