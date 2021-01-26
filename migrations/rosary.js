exports.up = (knex) => {
    return knex.schema.createTable("rosary", table => {
        table.increments("id").primary();
        table.integer("index").notNullable();
        table.string("display_code", 20)
            .notNullable()
            .references("code")
            .inTable("display");
        table.string("mystery_code", 20)
            .notNullable()
            .references("code")
            .inTable("mystery");
        table.string("bead_code", 20)
            .references("code")
            .inTable("bead");
        table.timestamps();
    });
};

// Remove
exports.down = (knex) => {
    return knex.schema.dropTable("rosary")
};