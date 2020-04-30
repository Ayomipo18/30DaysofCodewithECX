const jwt = require('jsonwebtoken');
require('dotenv').config();
const users = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
	const { name, email, password, phoneNumber, transactionPin } = req.body;
	//checks if a user with the email address already exists
	const userExists = await users.findOne({ email });
    const phoneNumberExists = await users.findOne({ phoneNumber });
	if(userExists) return res.status(403).json({error : 'Email is already registered'});
    if(phoneNumberExists) return res.status(403).json({error : 'phoneNumber Exists already'});
    if(!name && !phoneNumber)return res.status(403).json({error: "Please input name and phoneNumber"});

	const saltRounds = 10;
	await bcrypt.hash(password, saltRounds, (err, hash) =>{
		if(err) return err;
        bcrypt.hash(transactionPin, saltRounds, (err, hashPin) =>{
            if(err) return err;
            const newUser = new users({name, email, phoneNumber, hashPin, hash});
            //add newUser to all users array
            newUser.save();
            return res.json({
                success: true,
                message: "User signed up successfully"})
        })
	})
};

exports.login = async (req, res) => {
    // find the user based on email
    const { email, password } = req.body;

    let user;
    //check if any user has that email
    user = await users.findOne({email});
	if(!user) return res.status(403).json({error : "User does not exist"});
        //if user exists, compare password
	await bcrypt.compare(password, user.hash, (err, result) =>{
		if(err) return err;
		//if password doesnt match, return error
		if(result === false) return res.status(403).json({error : "Incorrect login credentials"});
		// generate a token with email and secret
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });//incase of signout
        // return response with username, email and token
        user.lastlogin = Date.now();
        user.save(err => {
            if(err) return res.status(403).json({error: "could not save last login"});
            const { _id} = user;
            return res.json({ token, user: { _id, email} });
        })
	})
};
