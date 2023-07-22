import { Knex } from "knex";
const tableName = "users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")); //since were using postgres
    table.uuid("id").primary();
    table.string("fullName").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("city").notNullable();
    table.string("nationality").notNullable();
    table.string("phoneNumber").notNullable();
    table.boolean("isVerified").defaultTo(false);
    table.string("verificationCode").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
