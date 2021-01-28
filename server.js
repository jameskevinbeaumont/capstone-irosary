const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Load Config
dotenv.config({ path: './config/config.env' });

const userRoute = require('./routes/user');
const apiRoute = require('./routes/api');

const app = express();

// CORS
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoute);
app.use('/user', userRoute);

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
};

const PORT = process.env.PORT || 8081

app.listen(
    PORT,
    console.log(`Server running in [${process.env.NODE_ENV}] mode on port ${PORT}`)
);
