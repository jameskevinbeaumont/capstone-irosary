exports.up = (knex) => {
    return knex.schema.createTable("display", table => {
        table.string("code", 20).primary();
        table.string("display_sub_code", 20)
            .notNullable()
            .references("code")
            .inTable("display_sub");
        table.string("subtitle_mystery_2_1", 2);
        table.string("subtitle_mystery_2_2", 60);
        table.timestamps();
    });
};

// Remove
exports.down = (knex) => {
    return knex.schema.dropTable("display")
};