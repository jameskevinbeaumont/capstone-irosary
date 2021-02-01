exports.up = (knex) => {
    return knex.schema.createTable("mystery", table => {
        table.string("code", 20).primary();
        table.string("description", 40).notNullable();
        table.string("image", 100);
        table.integer("dayofweek_1").notNullable();
        table.integer("dayofweek_2");
        table.string("media_file", 100).notNullable();
        table.string("vtt_file", 100).notNullable();
        table.boolean("active").notNullable();
        table.integer("duration").notNullable();
        table.timestamps();
    });
};

// Remove
exports.down = (knex) => {
    return knex.schema.dropTable("mystery")
};