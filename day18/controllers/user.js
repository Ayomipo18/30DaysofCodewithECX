const jwt = require('jsonwebtoken');
require('dotenv').config();
const users = require('../models/user');

exports.getUser = async (req, res) => {
	const { email } = req.body;
	//get token from request header
  const token = await req.headers.authorization.split(' ')[1];
  //if no token is sent, return error message
  if(!token) return res.json(403).json({"error" : " allowed"});
	//verify token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  //check if email is equal to the decoded token
  if(email !== decoded.email) return res.status(403).json({"error" : "Not allowed"});
  //find user with that email
	const user = await users.findOne({ email: decoded.email });

	const { _id, username, date_created } = user;

	//function to generate time
	const gettime = (number) => {
    const usertime = new Date(number);
    const hour = usertime.getHours(), 
          minute = usertime.getMinutes();

    let result = `${hour}:${minute}${hour >= 12 ? 'PM' : 'AM'}`
    return result;
	}
	//function to generate date
	const getdate = (number) => {
    const userdate = new Date(number);
    const day = userdate.getDate(), 
          month = userdate.getMonth()+1,
          year = userdate.getFullYear();
    let output = `${day}-${month}-${year}`;
    return output;
	}	
	let time = gettime(date_created);
	let date = getdate(date_created);

	return res.json({
		_id, email, username, date, time
	})

}