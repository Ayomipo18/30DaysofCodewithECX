const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const users = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
	const { username, email, password } = req.body;
	//checks if a user with the email address already exists
	const userExists = await users.find(user => user.email === email);

	if(userExists) return res.status(403).json({error : 'Email is already registered'});

	const saltRounds = 10;
	bcrypt.hash(password, saltRounds, (err, hash) =>{
		if(err) return err;
		else{
		const newUser = {username, email, hash, dateCreated: Date.now()};
			 //add newUser to all users array
    		 users.push(newUser);
    		  return res.json({
 				success: true,
    			message: "User signed up successfully"})
			}
	})
};

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
   //check if any user has that email
	const user = users.find(user => user.email === email);
   
      //if no user has that email, return error message
	if(!user) res.status(403).json({error : "User does not exist"});
        //if user exists, compare password
	bcrypt.compare(password, user.hash, function(err, result){
		if(err) return err;
		else{
			//if password doesnt match, return error
		if(result === false) return res.status(403).json({error : "Incorrect login credentials"});
		// generate a token with email and secret
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // retrun response with username, email and token
        const { username, email } = user;
        return res.json({ token, user: { username, email } });
		
		}
	});
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
});