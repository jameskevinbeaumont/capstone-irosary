const knex = require('knex')({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "rootroot",
        database: "irosary",
        charset: "utf8"
    }
});

module.exports = knex;