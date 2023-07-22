import { Knex } from "knex";

const tableName = ""; //table name goes here

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, async (table) => {
    table.uuid("id").notNullable().primary().defaultTo(knex.raw("uuid_generate_v4()")); //db exension will be installed to postgres to auto generate the uuid
    table.string("value").notNullable();
    table.boolean("is_verified").defaultTo(true)
    table.enum("name", ["value1", "value2"])
    table.foreign('productId').references('products.id').onUpdate('CASCADE')
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
