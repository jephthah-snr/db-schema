import { Knex } from "knex";
const tableName = "orders";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")); //since were using postgres
    table.string("address").notNullable();
    table.string("totalAmount").notNullable();
    table.string("quantity").notNullable();
    table
      .enum("paymentMethod", ["cash_on_pickup", "cash_on_delivery", "card"])
      .defaultTo("card");
    table
      .enum("paymentStatus", ["pending", "failed", "completed"])
      .defaultTo("pending");
    table
      .enum("deliveryStatus", ["pending", "ongoing", "delivered"])
      .defaultTo("pending");
    table.string("totalItems").notNullable();
    table.uuid("userId").notNullable();
    table.boolean("shipping").defaultTo(false);
    table.enum("shippingType", ["air", "train", "land", "ocean"]);
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE");
    table.uuid("productId").nullable();
    table
      .foreign("productId")
      .references("id")
      .inTable("products")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
