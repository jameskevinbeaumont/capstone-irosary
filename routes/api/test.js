const express = require('express');
const router = express.Router();
const db = require('../../database');
const moment = require('moment');

router.route('/')
    .get((req, res) => {
        //res.send(`Hello from GET /api/test!`);
        db.select().from('knex_test').then((data) => {
            console.log(new Date().toISOString());
            console.log(moment().format(("YYYY-MM-DD HH.mm.SS.SSS")));
            res.send(data);
        });
    })
    .post((req, res) => {
        db.insert(req.body).into('knex_test').then((data) => {
            res.send(data);
        })
    });

module.exports = router;