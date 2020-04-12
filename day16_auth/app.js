const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//all users array
const users = [];

//register route
app.post("/signup", (req, res) => {
	const { username, email, password } = req.body;
	//checks if a user with the email address already exists
	const emailExists = users.find(user => user.email === email);

	//checks if username is taken
	const usernameExists = users.find(user => user.username === username);

	if(emailExists) return res.status(403).json({error : 'Email is already registered'});
    if(usernameExists) return res.status(403).json({error : 'Usernme is taken, choose another'});

	const saltRounds = 10;
	bcrypt.hash(password, saltRounds, (err, hash) =>{
		if(err) return err;
		else{
			 const newUser = {username, email, hash};
			 //add newUser to all users array
    		 users.push(newUser);
    		  return res.json({
 				success: true,
    			message: "User signed up successfully"})
			}
	})
});

app.post("/login", (req, res) => {
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

			//if password is coreect, return user deatils
			const {username, email} = user;
			return res.json({username, email});
		}
	})
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server running on port 3000")
});