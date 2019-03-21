exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {identifier: 1, name: "hammer", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1,},
        {identifier: 2, name: "tennis shoes", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1},
        {identifier: 3, name: "LOTR Dvd", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1},
        {identifier: 4, name: "Radio", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1},
        {identifier: 5, name: "Television", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1},
        {identifier: 6, name: "saw", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 7, name: "bowling shoes", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 8, name: "Game of Thrones Dvd", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 9, name: "Iphone", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 10, name: "Television", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 11, name: "drill", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 12, name: "running shoes", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 13, name: "Star Wars Dvd", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 14, name: "Headphones", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 15, name: "Television", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 16, name: "Golf Clubs", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 17, name: "golf shoes", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 18, name: "Star Trek Dvd", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 19, name: "Radio", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 20, name: "Television", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 21, name: "Power tools", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
        {identifier: 22, name: "work shoes", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
        {identifier: 23, name: "LOTR Dvd", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
        {identifier: 24, name: "Speakers", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
        {identifier: 25, name: "Television", description: "descriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
      ]);
    });
};
