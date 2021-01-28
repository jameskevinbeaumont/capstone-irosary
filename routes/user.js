const express = require('express');
// const cors = require('cors');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const User = require('../models/User');
const db = require('../database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// const app = express();

const router = express.Router();

// app.use(cors({
//     origin: ["http://localhost:8080"],
//     methods: ["GET", "POST"],
//     credentials: true
// }));

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//     key: "userId",
//     secret: "klq_noVh0Xkp-Vkesopvr-UJ",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60 * 60 * 24,
//     },
// }));

router.route('/register')
    .post((req, res) => {
        console.log(req.body);
        console.log(req.body.password);

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

    });

router.route('/login')
    .post((req, res) => {
        console.log(req.body.email);
        console.log(req.body.password);

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