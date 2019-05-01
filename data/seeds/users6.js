exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").then(function() {
    // Inserts seed entries
    return knex("users").insert({
      identifier: 501,
      displayName: "John Doe",
      uuid: "28e13892-4ffa-11e9-8647-d663bd873d93",
      email: "scannardummylogin@gmail.com",
      uid: "cn5x8lJ387S0yCdZeYvZMVfvi0g2"
    });
  });
};
