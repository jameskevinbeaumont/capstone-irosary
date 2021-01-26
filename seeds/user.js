const userData = require('../seed_data/user');

exports.seed = knex => {
    return knex('users')
        .truncate()
        .then(() => {
            return knex('users').insert(userData)
        });
};