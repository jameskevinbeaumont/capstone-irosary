const express = require('express');
const db = require('../database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

router.route('/register')
    .post((req, res) => {
        db.select('email')
            .from('users')
            .where('email', '=', req.body.email)
            .then((data) => {
                if (data.length !== 0) {
                    res.status(500).send(`Email already exists!`)
                } else {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        db.insert([{
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            created_at: req.body.created_at,
                            updated_at: req.body.updated_at
                        }])
                            .into('users').then((data) => {
                                res.send(data)
                            })
                    })
                }
            })
            .catch((err => res.status(500).send(err.code)))
    });

router.route('/login')
    .post((req, res) => {
        db.select(
            'firstName', 'lastName', 'email', 'password'
        )
            .from('users')
            .where('email', '=', req.body.email)
            // .andWhere('password', '=', req.body.password)
            .then((data) => {
                if (data.length !== 0) {
                    bcrypt.compare(req.body.password, data[0].password,
                        (error, response) => {
                            if (response) {
                                res.status(200).send(data);
                            } else {
                                res.status(500).send(`Username and/or password invalid!`)
                            }
                        })
                } else {
                    res.status(500).send(`User does not exist!`)
                }
            })
            .catch((err => {
                if (typeof err.code === 'undefined') {
                    res.status(500).send('User not found!')
                } else {
                    res.status(500).send(err.code)
                }
            }))
    });

module.exports = router;