exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {identifier: 1, name: "hammer", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1, uuid: "ad5ced7e-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 2, name: "tennis shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1, uuid: "ad5cf0a8-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 3, name: "LOTR Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1, uuid: "ad5cf2ce-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 4, name: "Radio", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1, uuid: "ad5cf6a2-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 5, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 1, uuid: "ad5cf8f0-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 6, name: "saw", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2, uuid: "ad5cfa8a-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 7, name: "bowling shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2, uuid: "ad5cfe72-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 8, name: "Game of Thrones Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2, uuid: "ad5d000c-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 9, name: "Iphone", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2, uuid: "ad5d0160-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 10, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 2, uuid: "ad5d02aa-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 11, name: "drill", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3, uuid: "ad5d03ea-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 12, name: "running shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3, uuid: "ad5d087c-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 13, name: "Star Wars Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3, uuid: "ad5d0a16-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 14, name: "Headphones", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3, uuid: "ad5d0b6a-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 15, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 3, uuid: "ad5d0cb4-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 16, name: "Golf Clubs", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4, uuid: "ad5d109c-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 17, name: "golf shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4, uuid: "ad5d1326-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 18, name: "Star Trek Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4, uuid: "ad5d1484-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 19, name: "Radio", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4, uuid: "ad5d15ce-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 20, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 4, uuid: "ad5d193e-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 21, name: "Power tools", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5, uuid: "ad5d1ab0-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 22, name: "work shoes", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5, uuid: "ad5d1c0e-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 23, name: "LOTR Dvd", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5, uuid: "ad5d1d62-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 24, name: "Speakers", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5, uuid: "ad5d2140-4ff9-11e9-8647-d663bd873d93"},
        {identifier: 25, name: "Television", productDescription: "productDescriptiongoeshere", weight: 10, length: 10, height: 10, value: 100, userId: 5, uuid: "ad5d22bc-4ff9-11e9-8647-d663bd873d93"},
      ]);
    });
};
