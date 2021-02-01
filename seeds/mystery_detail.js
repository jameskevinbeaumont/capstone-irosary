const mysteryDetailData = require('../seed_data/mystery_detail');

exports.seed = knex => {
    return knex('mystery_detail')
        .del()
        .then(() => {
            return knex('mystery_detail').insert(mysteryDetailData)
        });
};