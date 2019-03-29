const faker = require("faker");
const bcrypt = require("bcryptjs");

const fakerUsers = () => {
  let usersArray = [
    {
      identifier: 1,
      displayName: "Jacob Bryan",
      uuid: "28e13892-4ffa-11e9-8647-d663bd873d93",
      email: "jbryantech228@gmail.com",
      uid: "q1lHIM09fnWMAxZ6t116rkaS92E2"
    },
    {
      identifier: 2,
      displayName: "Ian Cameron",
      uuid: "28e13b94-4ffa-11e9-8647-d663bd873d93",
      email: "icnyny@gmail.com",
      uid: "9vgH6we6tAPuiVzkKXGKl7wWIHl2",

    },
    {
      identifier: 3,
      displayName: "Randy Wilson",
      uuid: "28e13d24-4ffa-11e9-8647-d663bd873d93",
      email: "phoenixrr2113@gmail.com",
      uid: "gf3skp6A4lMSN8C1jdCfI67s60e2"
    },
    {
      identifier: 4,
      displayName: "Ben Hakes",
      uuid: "28e14170-4ffa-11e9-8647-d663bd873d93",
      email: "ben@paretoadvisors.com",
      uid: "EdfZQhFTBtSQkO7iMwbDOn6LeQ23"
    },
    {
      identifier: 5,
      displayName: "Joshua Kaunert",
      uuid: "28e14314-4ffa-11e9-8647-d663bd873d93",
      email: "soap_box@icloud.com",
      uid: "GAAjDjhazJhv7PPvMgHX3QNtauv1"
    }
  ];
  for (i = 6; i <= 100; i++) {
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
    .truncate()
    .then(function() {
      return knex("users").insert(fakerUsers());
    });
};
