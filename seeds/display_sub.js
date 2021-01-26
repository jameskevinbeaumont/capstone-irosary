const displaySubData = require('../seed_data/display_sub');

exports.seed = knex => {
    return knex('display_sub')
        .del()
        .then(() => {
            return knex('display_sub').insert(displaySubData)
        });
};