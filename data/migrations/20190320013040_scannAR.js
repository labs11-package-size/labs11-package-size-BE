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
      column.string("arAsset", 512).defaultTo("");
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
    .createTable("product_images", column => {
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
      column.boolean("arrived").defaultTo(false);
      column.date("dateShipped", 24);
      column
        .integer("productId")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      column.string("shippedFrom", 512).defaultTo("");
      column.string("trackingNumber", 128).defaultTo("");
      column.string("carrierName", 128).defaultTo("");
      column.string("shippingType", 128).defaultTo("");
    })
    .createTable("shippingTo", column => {
      column.increments("identifier");
      column.string("customerName", 128).notNullable();
      column.string("customerEmail", 128).defaultTo("");
      column.string("customerAddress", 512).notNullable();
      column.string("deliveryInstructions", 512).defaultTo("");
      column
        .integer("shipmentId")
        .unsigned()
        .references("id")
        .inTable("shipments")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("user_addresses")
    .dropTableIfExists("products")
    .dropTableIfExists("product_images")
    .dropTableIfExists("shipments")
    .dropTableIfExists("shippingTo");
};
