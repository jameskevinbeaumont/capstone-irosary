exports.up = (knex) => {
    return knex.schema.createTable("display_sub", table => {
        table.string("code", 20).primary();
        table.string("image", 100);
        table.boolean("crucifix").notNullable();
        table.string("title", 60).notNullable();
        table.string("subtitle", 2);
        table.string("subtitle_2_1", 60);
        table.string("subtitle_2_2", 60);
        table.timestamps();
    });
};

// Remove
exports.down = (knex) => {
    return knex.schema.dropTable("display_sub")
};