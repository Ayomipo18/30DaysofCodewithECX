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

exports.userById = (req, res, next, id) => {
    users.findById(id)
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }
            req.profile = user; // adds profile object in req with user info
            next();
        });
};

exports.verifyUser = async (req, res, next) => {
  const user = req.profile;
  //get token
  const token = await req.headers.authorization.split(' ')[1];
  //if no token is sent, return error message
  if(!token) return res.status(403).json({"error" : "Not allowed"});
  //verify token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  //check if email is equal to the decoded token
  if(user.email !== decoded.email) return res.status(403).json({"error" : "Not allowed"});
  next();
};

exports.getUser = async (req, res) => {
	const {_id} = req.profile;
  //find user with that id
	const user = await users.findById({_id });
  if(!user) return res.status(403).json({error: "User does not exist"})

	const { username, email, names, occupation} = user;
  let {date_created} = user;
	let time = gettime(date_created);
	let date = getdate(date_created);
  date_created = `${date} - ${time}`;

  let {lastlogin} = user;
  let logintime = gettime(lastlogin);
  let logindate = getdate(lastlogin);
  lastlogin = `${logindate} - ${logintime}`;

	return res.json({
		_id, email, username, date_created , names, occupation, lastlogin 
	})
};

exports.getAllUsers = async (req, res) =>{
  await users.find((err, result) => {
      if(err) return res.status(403).json({"error": err});
      return res.json(result)
  }).select('_id username email names occupation lastlogin date_created');
}

exports.updateUser = async (req, res) => {
    const {_id} = req.profile;
    //Get email of user to update
    const updatedUser = await users.findOneAndUpdate({_id}, req.body, {new: true});
    if(!updatedUser) return res.json({ error : "User not found"});
    //remember not to return user hash
    updatedUser.hash = undefined;

    const { email, username, names, occupation } = updatedUser;
  
    let {date_created} = updatedUser;
    let time = gettime(date_created);
    let date = getdate(date_created);
    date_created = `${date} - ${time}`;

    let {lastlogin} = updatedUser;
    let logintime = gettime(lastlogin);
    let logindate = getdate(lastlogin);
    lastlogin = `${logindate} - ${logintime}`;

    return res.json({
    _id, email, username, date_created , names, occupation, lastlogin 
  })
};

exports.deleteUser = async (req, res) => {
    const {_id} = req.profile;
    //Get id of user to delete from req.profile
    const user = await users.findOneAndDelete({_id});
    if(!user) return res.json({ error : "User not found"});
    return res.json({message : "User deleted successfully"});
}