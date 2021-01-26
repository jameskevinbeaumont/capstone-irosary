exports.up = (knex) => {
    return knex.schema.createTable("bead", table => {
        table.string("code", 20).primary();
        table.string("html_id", 100).notNullable();
        table.timestamps();
    });
};

// Remove
exports.down = (knex) => {
    return knex.schema.dropTable("bead")
};