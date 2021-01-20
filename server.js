const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// Load Config
dotenv.config({ path: './config/config.env' });

// Passport Config
require('./config/passport')(passport);

// Connect to DB (mongoDB)
connectDB();

const userRoute = require('./routes/user');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoute);

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
};

// Sessions
app.use(session({
    secret: 'mary loves you!',
    resave: false,
    saveUninitialized: false

}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
const PORT = process.env.PORT || 8081

app.listen(
    PORT,
    console.log(`Server running in [${process.env.NODE_ENV}] mode on port ${PORT}`)
);
