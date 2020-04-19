const jwt = require('jsonwebtoken');
require('dotenv').config();
const users = require('../models/user');

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

exports.verifyUser = async (req, res, next) => {
  //get email from request body
  const { email } = req.body;
  //get token
  const token = await req.headers.authorization.split(' ')[1];
  //if no token is sent, return error message
  if(!token) return res.status(403).json({"error" : "Not allowed"});
  //verify token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  //check if email is equal to the decoded token
  if(email !== decoded.email) return res.status(403).json({"error" : "Not allowed"});
  next();
};

exports.getUser = async (req, res) => {
	const { email } = req.body;
  //find user with that email
	const user = await users.findOne({ email });
  if(!user) return res.status(403).json({error: "User does not exist"})

  const { _id, username, date_created } = user;
  
	let time = gettime(date_created);
	let date = getdate(date_created);
	return res.json({
		_id, email, username, date, time
	})
};

exports.getAllUsers = async (req, res) =>{
  await users.find((err, result) => {
      if(err) return res.status(403).json({"error": err});
      return res.json(result)
  }).select('_id username email date_created');
}

exports.updateUser = async (req, res) => {
    //Get email of user to update
    const { email } = req.body;
    const updatedUser = await users.findOneAndUpdate({email}, req.body, {new: true});
    if(!updatedUser) return res.json({ error : "User not found"});
    //remember not to return user hash
    updatedUser.hash = undefined;

    const { _id, username, date_created } = updatedUser;
  
    let time = gettime(date_created);
    let date = getdate(date_created);

    return res.json({
    _id, email, username, date, time
  })
};

exports.deleteUser = async (req, res) => {
    //Get email of user to delete from req.body 
    const { email } = req.body;
    const user = await users.findOneAndDelete({email});
    if(!user) return res.json({ error : "User not found"});
    return res.json({message : "User deleted successfully"});
}