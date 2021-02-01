exports.up = (knex) => {
    return knex.schema.createTable("mystery_detail", table => {
        table.string("code", 20).primary();
        table.string("mystery_code", 20).primary();
        table.string("image", 100);
        table.string("title", 100).notNullable();
        table.string("subtitle", 100).notNullable();
        table.string("detail_1", 500).notNullable();
        table.string("detail_2", 500).notNullable();
        table.string("detail_3", 500).notNullable();
        table.string("detail_4", 500).notNullable();
        table.string("detail_5", 500).notNullable();
        table.string("detail_6", 500).notNullable();
        table.string("detail_7", 500).notNullable();
        table.string("detail_8", 500).notNullable();
        table.string("detail_9", 500).notNullable();
        table.string("detail_10", 500).notNullable();
        table.timestamps();
    });
};

// Remove
exports.down = (knex) => {
    return knex.schema.dropTable("mystery_detail")
};