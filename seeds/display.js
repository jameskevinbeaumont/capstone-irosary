const displayData = require('../seed_data/display');

exports.seed = knex => {
    return knex('display')
        .del()
        .then(() => {
            return knex('display').insert(displayData)
        });
};