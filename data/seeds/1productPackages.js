const renderRecords = () => {
  const renderedRecords = [];
  for (i = 0; i <= 5; i++) {
    renderedRecords.push(
      { productId: 1 + i * 23, pendingShipmentsId: 1 + i * 23 },
      { productId: 2 + i * 23, pendingShipmentsId: 1 + i * 23 },
      { productId: 5 + i * 23, pendingShipmentsId: 1 + i * 23 },
      { productId: 6 + i * 23, pendingShipmentsId: 2 + i * 23 },
      { productId: 6 + i * 23, pendingShipmentsId: 2 + i * 23 },
      { productId: 23 + i * 23, pendingShipmentsId: 2 + i * 23 },
      { productId: 6 + i * 23, pendingShipmentsId: 3 + i * 23 },
      { productId: 7 + i * 23, pendingShipmentsId: 3 + i * 23 },
      { productId: 8 + i * 23, pendingShipmentsId: 3 + i * 23 },
      { productId: 13 + i * 23, pendingShipmentsId: 3 + i * 23 },
      { productId: 20 + i * 23, pendingShipmentsId: 4 + i * 23 },
      { productId: 22 + i * 23, pendingShipmentsId: 4 + i * 23 },
      { productId: 16 + i * 23, pendingShipmentsId: 5 + i * 23 },
      { productId: 20 + i * 23, pendingShipmentsId: 6 + i * 23 },
      { productId: 12 + i * 23, pendingShipmentsId: 7 + i * 23 },
      { productId: 23 + i * 23, pendingShipmentsId: 8 + i * 23 },
      { productId: 20 + i * 23, pendingShipmentsId: 9 + i * 23 },
      { productId: 21 + i * 23, pendingShipmentsId: 9 + i * 23 },
      { productId: 19 + i * 23, pendingShipmentsId: 9 + i * 23 },
      { productId: 9 + i * 23, pendingShipmentsId: 10 + i * 23 },
      { productId: 4 + i * 23, pendingShipmentsId: 11 + i * 23 },
      { productId: 10 + i * 23, pendingShipmentsId: 11 + i * 23 },
      { productId: 4 + i * 23, pendingShipmentsId: 11 + i * 23 },
      { productId: 16 + i * 23, pendingShipmentsId: 12 + i * 23 },
      { productId: 12 + i * 23, pendingShipmentsId: 13 + i * 23 },
      { productId: 11 + i * 23, pendingShipmentsId: 13 + i * 23 },
      { productId: 21 + i * 23, pendingShipmentsId: 13 + i * 23 },
      { productId: 4 + i * 23, pendingShipmentsId: 14 + i * 23 },
      { productId: 19 + i * 23, pendingShipmentsId: 14 + i * 23 },
      { productId: 3 + i * 23, pendingShipmentsId: 14 + i * 23 },
      { productId: 16 + i * 23, pendingShipmentsId: 14 + i * 23 },
      { productId: 22 + i * 23, pendingShipmentsId: 15 + i * 23 },
      { productId: 7 + i * 23, pendingShipmentsId: 15 + i * 23 },
      { productId: 5 + i * 23, pendingShipmentsId: 16 + i * 23 },
      { productId: 7 + i * 23, pendingShipmentsId: 17 + i * 23 },
      { productId: 5 + i * 23, pendingShipmentsId: 17 + i * 23 },
      { productId: 4 + i * 23, pendingShipmentsId: 18 + i * 23 },
      { productId: 3 + i * 23, pendingShipmentsId: 18 + i * 23 },
      { productId: 14 + i * 23, pendingShipmentsId: 18 + i * 23 },
      { productId: 16 + i * 23, pendingShipmentsId: 19 + i * 23 },
      { productId: 18 + i * 23, pendingShipmentsId: 19 + i * 23 },
      { productId: 17 + i * 23, pendingShipmentsId: 20 + i * 23 },
      { productId: 13 + i * 23, pendingShipmentsId: 21 + i * 23 },
      { productId: 13 + i * 23, pendingShipmentsId: 22 + i * 23 },
      { productId: 15 + i * 23, pendingShipmentsId: 22 + i * 23 },
      { productId: 15 + i * 23, pendingShipmentsId: 23 + i * 23 },
      { productId: 8 + i * 23, pendingShipmentsId: 23 + i * 23 },
      { productId: 8 + i * 23, pendingShipmentsId: 23 + i * 23 },
      { productId: 6 + i * 23, pendingShipmentsId: 23 + i * 23 }
    );
  }
  return renderedRecords;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("productPackages")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("productPackages").insert(renderRecords());
    });
};
