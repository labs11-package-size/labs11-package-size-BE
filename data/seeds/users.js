const faker = require("faker");
const uuidTimestamp = require("uuid/v1");

const fakerUsers = () => {
  let usersArray = [
    {
      identifier: 1,
      displayName: "Jacob Bryan",
      uuid: uuidTimestamp(),
      email: "jbryantech228@gmail.com",
      uid: "q1lHIM09fnWMAxZ6t116rkaS92E2",
      photoURL: "https://ca.slack-edge.com/T4JUEB3ME-UDHUTSKJL-45af9760ac24-48"
    },
    {
      identifier: 2,
      displayName: "Ian Cameron",
      uuid: uuidTimestamp(),
      email: "icnyny@gmail.com",
      uid: "9vgH6we6tAPuiVzkKXGKl7wWIHl2",
      photoURL: "https://ca.slack-edge.com/T4JUEB3ME-UBTMU3RFA-c749fafab441-48"

    },
    {
      identifier: 3,
      displayName: "Randy Wilson",
      uuid: uuidTimestamp(),
      email: "phoenixrr2113@gmail.com",
      uid: "CkUWYZ0xAdZtmL8jdz8dkMNpNE82",
      photoURL: "https://ca.slack-edge.com/T4JUEB3ME-U805SN6TC-f579479336b7-48"
    },
    {
      identifier: 4,
      displayName: "Ben Hakes",
      uuid: uuidTimestamp(),
      email: "ben@paretoadvisors.com",
      uid: "EdfZQhFTBtSQkO7iMwbDOn6LeQ23",
      photoURL: "https://ca.slack-edge.com/T4JUEB3ME-UAUHTHMSS-74f09cf4b805-48"
    },
    {
      identifier: 5,
      displayName: "Joshua Kaunert",
      uuid: uuidTimestamp(),
      email: "soap_box@icloud.com",
      uid: "GAAjDjhazJhv7PPvMgHX3QNtauv1",
      photoURL: "https://ca.slack-edge.com/T4JUEB3ME-UCDDK8FJQ-a06409f4fbb5-48"
    },
    {
      identifier: 6,
      displayName: "Joshua Howland",
      uuid: uuidTimestamp(),
      email: "me@jkhowland.com",
      uid: "hsyjofdxEdVa3HpdqcvIiWqHTuU2",
    }
  ];
  for (i = 7; i <= 100; i++) {
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
