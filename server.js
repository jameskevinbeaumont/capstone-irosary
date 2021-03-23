const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// Load Config
dotenv.config({ path: './config/config.env' });

const userRoute = require('./routes/user');
const apiRoute = require('./routes/api');

const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://shrouded-journey-38552.heroku'];
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))
//app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoute);
app.use('/user', userRoute);

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
};

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

const PORT = process.env.PORT || 8081

app.listen(
    PORT,
    console.log(`Server running in [${process.env.NODE_ENV}] mode on port ${PORT}`)
);
