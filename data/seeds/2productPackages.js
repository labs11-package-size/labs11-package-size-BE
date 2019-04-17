
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('productPackages')
    .then(function () {
      // Inserts seed entries
      return knex('productPackages').insert([
        { productId: 501, pendingShipmentsId: 501},
        { productId: 502, pendingShipmentsId: 502},
        { productId: 503, pendingShipmentsId: 503},
        { productId: 504, pendingShipmentsId: 504},
        { productId: 505, pendingShipmentsId: 505},
      ]);
    });
};
