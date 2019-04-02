exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", column => {
      column.increments("identifier");
      column.string("displayName", 128).defaultTo("");
      column.string("photoURL", 512).defaultTo("");
      column.string("email", 128).defaultTo("");
      column.uuid("uuid").defaultTo("");
      column.string("uid", 32).defaultTo("");
    })
    .createTable("products", column => {
      column.increments("identifier");
      column.date("lastUpdated", 24);
      column.string("name", 128).notNullable();
      column.string("productDescription", 512).defaultTo("");
      column.decimal("weight", 9, 2);
      column.decimal("value", 9, 2);
      column.decimal("length", 9, 2).notNullable();
      column.decimal("width", 9, 2).notNullable();
      column.decimal("height", 9, 2).notNullable();
      column.string("manufacturerId", 512).defaultTo("");
      column.boolean("fragile").defaultTo(false);
      column.uuid("uuid");
      column
        .integer("userId")
        .unsigned()
        .references("identifier")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("product_assets", column => {
      column.increments("identifier");
      column.string("label", 24).defaultTo("");
      column.string("url", 512).defaultTo("");
      column.uuid("uuid");
      column
        .integer("productId")
        .unsigned()
        .references("identifier")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("boxes", column => {
      column.increments("identifier");
      column.string("dimensions");
      column.string("maxWeight");
      column.boolean("custom");
      column.uuid("uuid");
      column.date("lastUpdated", 24).defaultTo("");
    })
    .createTable("productPackages", column => {
      column
        .integer("productId")
        .unsigned()
        .references("identifier")
        .inTable("pendingShipments");
      column
        .integer("pendingShipmentsId")
        .unsigned()
        .references("identifier")
        .inTable("pendingShipments");
    })
    .createTable("pendingShipments", column => {
      column.increments("identifier");
      column.integer("itemCount");
      column.decimal("totalWeight", 7, 2);
      column.string("modueURL", 512);
      column.uuid("uuid");
      column.date("lastUpdated", 24).defaultTo("");
      column
        .integer("boxId")
        .unsigned()
        .references("identifier")
        .inTable("boxes");
    })
    .createTable("shipments", column => {
      column.increments("identifier");
      column.date("lastUpdated", 24).defaultTo("");
      column.date("dateShipped", 24).defaultTo("");
      column.date("dateArrived", 24).defaultTo("");
      column.string("productName", 128).defaultTo("");
      column.string("shippedTo", 512).defaultTo("");
      column.string("trackingNumber", 128).defaultTo("");
      column.string("carrierName", 128).defaultTo("");
      column.string("shippingType", 128).defaultTo("");
      column.integer("status").defaultTo("");
      column.uuid("uuid");
      column
        .integer("productId")
        .unsigned()
        .references("identifier")
        .inTable("products");
      column
        .integer("pendingShipmentsId")
        .unsigned()
        .references("identifier")
        .inTable("pendingShipments");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("products")
    .dropTableIfExists("product_assets")
    .dropTableIfExists("boxes")
    .dropTableIfExists("shipments")
    .dropTableIfExists("productPackages")
    .dropTableIfExists("pendingShipments")
};
