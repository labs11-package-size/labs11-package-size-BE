const faker = require("faker");
const bcrypt = require("bcryptjs");

const fakerUsers = () => {
  let usersArray = [
    {
      identifier: 1,
      username: "jacob",
      password: "$2a$10$aGyHHUoDh6dJeMoKgbgp.u8kBtwXzlczFh6cC6757iocDOeo5kvcm",
      uuid: "28e13892-4ffa-11e9-8647-d663bd873d93"
    },
    {
      identifier: 2,
      username: "ian",
      password: "$2a$10$EiSVN3ydlAi98ENW6bt3c.PxFIVMv4qRzPp.H41xQfVn4/I5EL86a",
      uuid: "28e13b94-4ffa-11e9-8647-d663bd873d93"
    },
    {
      identifier: 3,
      username: "randy",
      password: "$2a$10$oWkChRLA4CEyM8IXX0.bxe2P6x3rwDz9LrYSl2U9Say4AAYb0HEXW",
      uuid: "28e13d24-4ffa-11e9-8647-d663bd873d93"
    },
    {
      identifier: 4,
      username: "ben",
      password: "$2a$10$7zOXTe4R6cjTb239WeL8MeKxCk1ex9tcohrX5oPsL89f5Ary8dPvq",
      uuid: "28e14170-4ffa-11e9-8647-d663bd873d93"
    },
    {
      identifier: 5,
      username: "joshua",
      password: "$2a$10$uh3ULkTSIYe6.g3pXFcQVOYKRLA8Hw7zVJgHQInXZoOkf7A8omXha",
      uuid: "28e14314-4ffa-11e9-8647-d663bd873d93"
    }
  ];
  for (i = 6; i <= 100; i++) {
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
    .truncate()
    .then(function() {
      return knex("users").insert(fakerUsers());
    });
};
