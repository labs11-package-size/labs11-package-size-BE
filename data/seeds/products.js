exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {identifier: 1, name: "hammer", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1,},
        {identifier: 2, name: "tennis shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1},
        {identifier: 3, name: "LOTR Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1},
        {identifier: 4, name: "Radio", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1},
        {identifier: 5, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1},
        {identifier: 6, name: "saw", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 7, name: "bowling shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 8, name: "Game of Thrones Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 9, name: "Iphone", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 10, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2},
        {identifier: 11, name: "drill", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 12, name: "running shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 13, name: "Star Wars Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 14, name: "Headphones", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 15, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3},
        {identifier: 16, name: "Golf Clubs", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 17, name: "golf shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 18, name: "Star Trek Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 19, name: "Radio", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 20, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4},
        {identifier: 21, name: "Power tools", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
        {identifier: 22, name: "work shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
        {identifier: 23, name: "LOTR Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
        {identifier: 24, name: "Speakers", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
        {identifier: 25, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5},
      ]);
    });
};
