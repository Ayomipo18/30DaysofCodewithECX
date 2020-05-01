const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

//bring in routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const whitelist = ['https://ecx30daysofcode.herokuapp.com'];
const corsOptions = {
	origin: (origin, callback) => {
		if(whitelist.indexOf(origin) !== -1 ) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
};
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/User"; 

mongoose.connect(MONGO_URI, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex : true
	})
	.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
	console.log(`DB connection error: ${err.message}`)
});

//middleware
app.use(morgan(':method :url :status :response-time ms', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/protected', cors(corsOptions), (req, res) => {
 	res.status(200).json({message: 'CORS policy'})
 });

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server running on " + port)
});