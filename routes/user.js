const express = require('express');

const User = require('../models/User');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        User.where(req.query)
            .fetchAll()
            .then(users => res.status(200).json(users))
    })

module.exports = router;