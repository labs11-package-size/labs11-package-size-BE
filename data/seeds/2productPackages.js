
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
        { productId: 506, pendingShipmentsId: 506},
        { productId: 507, pendingShipmentsId: 507},
        { productId: 508, pendingShipmentsId: 508},
        { productId: 509, pendingShipmentsId: 509},
        { productId: 510, pendingShipmentsId: 510},
      ]);
    });
};
