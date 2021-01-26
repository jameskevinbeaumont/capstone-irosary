const mysteryData = require('../seed_data/mystery');

exports.seed = knex => {
    return knex('mystery')
        .del()
        .then(() => {
            return knex('mystery').insert(mysteryData)
        });
};