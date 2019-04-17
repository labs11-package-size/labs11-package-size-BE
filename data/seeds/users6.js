exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").then(function() {
    // Inserts seed entries
    return knex("users").insert({
      identifier: 501,
      displayName: "Ben Hakes",
      uuid: "28e13892-4ffa-11e9-8647-d663bd873d93",
      email: "bhhakes@gmail.com ",
      uid: "c9PjadaVBTY0f2BbYxmhvTkqYID2",
      photoURL: "https://ca.slack-edge.com/T4JUEB3ME-UAUHTHMSS-74f09cf4b805-48"
    });
  });
};
