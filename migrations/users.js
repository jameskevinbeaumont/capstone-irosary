// Create
exports.up = (knex) => {
    return knex.schema.createTable("users", table => {
        table.increments("id").primary();
        table.string("firstName").notNullable();
        table.string("lastName").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("googleID");
        table.string("displayName");
        table.string("image");
        table.timestamps();
    });
};

// Remove
exports.down = (knex) => {
    return knex.schema.dropTable("users")
};
