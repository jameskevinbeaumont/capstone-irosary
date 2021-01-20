// Create
exports.up = (knex) => {
    return knex.schema.createTable("users", table => {
        table.increments("id").primary();
        table.string("googleID").notNullable();
        table.string("displayName").notNullable();
        table.string("firstName").notNullable();
        table.string("lastName").notNullable();
        table.string("image");
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

// Remove
exports.down = (knex) => {
    return knex.schema.dropTable("users")
};
