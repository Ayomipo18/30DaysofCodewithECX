const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

//bring in routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server running on port 3000")
});