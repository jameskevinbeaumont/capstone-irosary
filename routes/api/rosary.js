const express = require('express');
const router = express.Router();
const db = require('../../database');

router.route('/mystery')
    .get((req, res) => {
        db.select(
            'code', 'description', 'image',
            'dayofweek_1', 'dayofweek_2',
            'media_file', 'vtt_file', 'active'
        )
            .from('mystery')
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((err => {
                if (typeof err.code === 'undefined') {
                    res.status(500).send('Mysteries not found!')
                } else {
                    res.status(500).send(err.code)
                }
            }))
    });

router.route('/:mystery')
    .get((req, res) => {
        db.select(
            'r.index', 'ds.image', 'ds.crucifix',
            'ds.title', 'ds.subtitle', 'ds.subtitle_2_1',
            'ds.subtitle_2_2', 'd.subtitle_mystery_2_1',
            'd.subtitle_mystery_2_2', 'd.decade', 'r.bead_code'
        )
            .from('rosary as r')
            .innerJoin('display AS d', 'd.code', 'r.display_code')
            .innerJoin('display_sub AS ds', 'ds.code', 'd.display_sub_code')
            .where('r.mystery_code', '=', req.params.mystery)
            .orderBy('r.index')
            .then((data) => {
                if (data.length !== 0) {
                    res.status(200).send(data)
                } else {
                    res.status(500).send(`Transcript data not found based on mystery provided (${req.params.mystery}).`)
                }
            })
            .catch((err => {
                if (typeof err.code === 'undefined') {
                    res.status(500).send('Mystery transcript data not found!')
                } else {
                    res.status(500).send(err.code)
                }
            }))
    });

router.route('/mystery/:dow')
    .get((req, res) => {
        db.select('code').from('mystery')
            .where('dayofweek_1', req.params.dow)
            .orWhere('dayofweek_2', req.params.dow)
            .then((data) => {
                db.select(
                    'code', 'description', 'image',
                    'media_file', 'vtt_file', 'active'
                ).from('mystery').where('code', '=', data[0].code)
                    .then((data => {
                        res.status(200).send(data)
                    }))
                    .catch((err => {
                        if (typeof err.code === 'undefined') {
                            res.status(500).send(`Mystery not found based on code provided (${req.params.dow}).`)
                        } else {
                            res.status(500).send(err.code)
                        }
                    }))
            })
            .catch((err => {
                if (typeof err.code === 'undefined') {
                    res.status(500).send(`Mystery not found based on day of week (${req.params.dow}) provided`)
                } else {
                    res.status(500).send(err.code)
                }
            }));
    });

router.route('/mystery/detail/:code')
    .get((req, res) => {
        db.select(
            'code', 'image', 'title', 'subtitle',
            'detail_1', 'detail_2', 'detail_3',
            'detail_4', 'detail_5', 'detail_6',
            'detail_7', 'detail_8', 'detail_9',
            'detail_10'
        )
            .from('mystery_detail')
            .where('mystery_code', req.params.code)
            .then((data) => {
                if (data.length !== 0) {
                    res.status(200).send(data)
                } else {
                    res.status(500).send(`Mystery details not found based on mystery code provided (${req.params.mystery}).`)
                }
            })
            .catch((err => {
                if (typeof err.code === 'undefined') {
                    res.status(500).send('Mystery details not found!')
                } else {
                    res.status(500).send(err.code)
                }
            }))
    });

module.exports = router;
