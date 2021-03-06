const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

//bring in routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

mongoose.connect("mongodb://localhost/User", { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
	})
	.then(() => console.log('DB Connected'));

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/', authRoutes);
app.use('/', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server running on port 3000")
});