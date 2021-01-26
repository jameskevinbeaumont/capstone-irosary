const rosaryData = require('../seed_data/rosary');

exports.seed = knex => {
    return knex('rosary')
        .del()
        .then(() => {
            return knex('rosary').insert(rosaryData)
        });
};