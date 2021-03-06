const faker = require("faker");

const fakerUsers = () => {
  let usersArray = []
  for (i = 401; i <= 500; i++) {
    usersArray.push({
      identifier: i,
      displayName: faker.name.findName(),
      email: faker.internet.email(),
      uuid: faker.random.uuid()
    });
  }
  return usersArray;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .then(function() {
      return knex("users").insert(fakerUsers());
    });
};