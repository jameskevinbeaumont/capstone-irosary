const beadData = require('../seed_data/bead');

exports.seed = knex => {
    return knex('bead')
        .del()
        .then(() => {
            return knex('bead').insert(beadData)
        });
};