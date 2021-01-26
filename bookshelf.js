const db = require('./database/');
const bookshelf = require('bookshelf')(db);
//const knex = require('knex')(require('./knexfile'));
//const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;