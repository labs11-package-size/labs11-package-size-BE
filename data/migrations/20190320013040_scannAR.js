exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", column => {
      column.increments("identifier");
      column.string("displayName", 128).defaultTo("");
      column.string("photoURL", 512).defaultTo("");
      column.string("email", 128).defaultTo("");
      column.string("uid", 32).defaultTo("");
      column.uuid("uuid");
    })
    .createTable("products", column => {
      column.increments("identifier");
      column.string("name", 32).notNullable();
      column.string("productDescription", 512).defaultTo("");
      column.decimal("weight", 9, 2).defaultTo(0);
      column.decimal("value", 9, 2).defaultTo(0);
      column.decimal("length", 9, 2).notNullable();
      column.decimal("width", 9, 2).notNullable();
      column.decimal("height", 9, 2).notNullable();
      column.string("manufacturerId", 512).defaultTo("");
      column.boolean("fragile").defaultTo(false);
      column.string("thumbnail", 512).defaultTo("");
      column.uuid("uuid");
      column.date("lastUpdated", 24);
      column
        .integer("userId")
        .unsigned()
        .references("identifier")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("productAssets", column => {
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
      column.string("dimensions", 24);
      column.string("maxWeight", 12);
      column.string("boxType", 12);
      column.boolean("custom");
      column.uuid("uuid");
      column.date("lastUpdated", 24).defaultTo("");
      column
        .integer("userId")
        .unsigned()
        .references("identifier")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("productPackages", column => {
      column
        .integer("productId")
        .unsigned()
        .references("identifier")
        .inTable("pendingShipments")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      column
        .integer("pendingShipmentsId")
        .unsigned()
        .references("identifier")
        .inTable("pendingShipments")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("pendingShipments", column => {
      column.increments("identifier");
      column.decimal("totalWeight", 9, 2).defaultTo(121.34);
      column.string("modelURL", 512);
      column.string("dimensions", 12).notNullable();
      column.uuid("uuid");
      column.date("lastUpdated", 24).defaultTo("");
      column
        .integer("userId")
        .unsigned()
        .references("identifier")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      column.string("productNames", 512).notNullable();
    })
    .createTable("shipments", column => {
      column.increments("identifier");
      column.date("dateShipped", 24).defaultTo("");
      column.date("dateArrived", 24).defaultTo("");
      column.string("productNames", 512).notNullable();
      column.decimal("totalWeight", 9, 2).defaultTo(121.34);
      column.string("shippedTo", 512).defaultTo("");
      column.string("trackingNumber", 128).defaultTo("");
      column.string("carrierName", 128).defaultTo("");
      column.string("shippingType", 128).defaultTo("");
      column.string("dimensions", 12).notNullable();
      column.integer("status").defaultTo("");
      column.uuid("uuid");
      column.date("lastUpdated", 24).defaultTo("");
      column
        .integer("productId")
        .unsigned()
        .references("identifier")
        .inTable("products");
      column
        .integer("userId")
        .unsigned()
        .references("identifier")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("products")
    .dropTableIfExists("productAssets")
    .dropTableIfExists("boxes")
    .dropTableIfExists("shipments")
    .dropTableIfExists("productPackages")
    .dropTableIfExists("pendingShipments");
};
