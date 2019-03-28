const faker = require("faker");
const bcrypt = require("bcryptjs");

const fakerUsers = () => {
  let usersArray = []
  for (i = 101; i <= 200; i++) {
    usersArray.push({
      identifier: i,
      username: faker.internet.userName(),
      password: bcrypt.hashSync(faker.internet.password(), 10),
      fullName: faker.name.findName(),
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