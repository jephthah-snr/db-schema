import { Knex } from "knex";

const tableName = "products";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("name");
    table.string("amount");
    table.text("description");
    table.text("bannerImage");
    table.text("images");
    table.integer("rating");
    table.integer("quantity");
    table.integer("discountPercentage");
    table.integer("discountPrice");
    table.tinyint("rating");
    table.boolean("outOfStock").defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
