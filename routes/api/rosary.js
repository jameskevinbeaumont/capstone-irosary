const express = require('express');
const router = express.Router();
const db = require('../../database');
const moment = require('moment');

router.route('/:mystery')
    .get((req, res) => {
        db.select(
            'r.index', 'ds.image', 'ds.crucifix',
            'ds.title', 'ds.subtitle', 'ds.subtitle_2_1',
            'ds.subtitle_2_2', 'd.subtitle_mystery_2_1',
            'd.subtitle_mystery_2_2', 'r.bead_code'
        )
            .from('rosary as r')
            .innerJoin('display AS d', 'd.code', 'r.display_code')
            .innerJoin('display_sub AS ds', 'ds.code', 'd.display_sub_code')
            .where('r.mystery_code', '=', req.params.mystery)
            .orderBy('r.index')
            .then((data) => {
                res.send(data)
            })
    });

router.route('/mystery/:dow')
    .get((req, res) => {
        console.log(req.params.dow)
        db.select('code').from('mystery')
            .where('dayofweek_1', req.params.dow)
            .orWhere('dayofweek_2', req.params.dow)
            .then((data) => {
                console.log(data[0].code)
                db.select(
                    'description', 'image', 'media_file', 'vtt_file'
                ).from('mystery').where('code', '=', data[0].code)
                    .then((data => {
                        res.send(data)
                    }))
            })
    });

module.exports = router;
