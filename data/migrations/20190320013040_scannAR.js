exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", column => {
      column.increments("identifier");
      column
        .string("username", 32)
        .notNullable()
        .unique();
      column.string("password", 32).notNullable();
      column.string("fullName", 128).defaultTo("");
      column.string("email", 128).defaultTo("");
      column.boolean("oAuth").defaultTo(false);
    })
    .createTable("user_addresses", column => {
      column.increments("identifier");
      column.string("label", 12).notNullable();
      column.string("address", 512).notNullable();
      column
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("products", column => {
      column.increments("identifier");
      column.string("name", 128).notNullable();
      column.string("description", 512).defaultTo("");
      column.integer("weight");
      column.integer("length");
      column.integer("width");
      column.integer("height");
      column.integer("value");
      column.string("manufacturerId", 512).defaultTo("");
      column.boolean("fragile").defaultTo(false);
      column
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("product_assets", column => {
      column.increments("identifier");
      column.string("imageURL", 512).defaultTo("");
      column
        .integer("productId")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("shipments", column => {
      column.increments("identifier");
      column.date("dateShipped", 24);
      column
        .integer("productId")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      column.string("shippedFrom", 512).defaultTo("");
      column.string("shippedTo", 512).defaultTo("");
      column.string("trackingNumber", 128).defaultTo("");
      column.string("carrierName", 128).defaultTo("");
      column.string("shippingType", 128).defaultTo("");
      column.integer("status")
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("user_addresses")
    .dropTableIfExists("products")
    .dropTableIfExists("product_assets")
    .dropTableIfExists("shipments")
};
