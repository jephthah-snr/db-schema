import { Knex } from "knex";
const tableName = "cart";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()')); //since were using postgres
        table.uuid("userId").notNullable();
        table.uuid("productId");
        table.integer("quantity");
        table.foreign("userId").references('users.id').onUpdate('CASCADE')  //.onDelete()?
        table.foreign("productId").references('products.id').onUpdate('CASCADE')
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(tableName)
}