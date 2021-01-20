const userData = require('../seed_data/user');

exports.seed = knex => {
    return knex('users')
        .del()
        .then(() => {
            return knex('users').insert(userData)
        });
};