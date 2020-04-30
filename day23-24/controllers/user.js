const jwt = require('jsonwebtoken');
require('dotenv').config();
const users = require('../models/user');
const bcrypt = require('bcrypt');


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
			if(err || !user){
				return res.status(400).json({
					error: 'User not found'
				});
			}
			req.profile = user;
			next();
		});
};

exports.auth = async (req, res, next) => {
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
}

exports.getUser = async (req, res) => {
  const {_id} = req.profile;
  //find user with that id
  const user = await users.findById({_id });
  if(!user) return res.status(403).json({error: "User does not exist"})

  const { name, email, phoneNumber, amount, transactionLogs } = user;
  let {date_created} = user;
  let time = gettime(date_created);
  let date = getdate(date_created);
  date_created = `${date} - ${time}`;

  let {lastlogin} = user;
  let logintime = gettime(lastlogin);
  let logindate = getdate(lastlogin);
  lastlogin = `${logindate} - ${logintime}`;

  return res.json({
  	 _id, email, name, phoneNumber, amount, transactionLogs, date_created, lastlogin 
  })
};

exports.updateUser = async (req, res) =>{
	 const {_id} = req.profile;
    //Get email of user to update
    const updatedUser = await users.findOneAndUpdate({_id}, req.body, {new: true});
    if(!updatedUser) return res.json({ error : "User not found"});
    //remember not to return user hash
    updatedUser.hash = undefined;

    const { email, name, phoneNumber, amount, transactionLogs } = updatedUser;
  
    let {date_created} = updatedUser;
    let time = gettime(date_created);
    let date = getdate(date_created);
    date_created = `${date} - ${time}`;

    let {lastlogin} = updatedUser;
    let logintime = gettime(lastlogin);
    let logindate = getdate(lastlogin);
    lastlogin = `${logindate} - ${logintime}`;

    return res.json({
    _id, email, name, date_created ,phoneNumber, amount, transactionLogs, lastlogin 
  })
}

exports.deleteUser = async (req, res) => {
    const {_id} = req.profile;
    //Get id of user to delete from req.profile
    const user = await users.findOneAndDelete({_id});
    if(!user) return res.json({ error : "User not found"});
    return res.json({message : "User deleted successfully"});
}

exports.getAllUsers = async (req, res) => {
  await users.find((err, result) => {
      if(err) return res.status(403).json({"error": err});
      return res.json(result)
  }).select('_id name email phoneNumber amount transactionLogs lastlogin date_created');
}

exports.transferFunds = async (req, res) => {
	const { phoneNumber, amount, transactionPin }  = req.body;
	const {_id} = req.profile;
	const debitor = await users.findById({_id});
	const creditor = await users.findOne({ phoneNumber });
	if(!debitor) return res.json({error: "User with id not found"});
	if(!creditor) return res.status(403).json({error: "User with Phone Number not found"});
	await bcrypt.compare(transactionPin, debitor.hashPin, (err, result) => {
		if(err || !result) return res.status(403).json({error: "Incorrect transactionPin"});
		if(debitor.amount < amount) return res.status(403).json({status: false, message: "Insufficient Funds"});
		users.findOneAndUpdate({ phoneNumber }, {amount: creditor.amount + amount}, {new: true}, (err, result) =>{
			if(err || !result) return res.status(403).json({error: "Creditor update failed"});
			creditor.transactionLogs.unshift({
				status: 'Credit',
				senderPhoneNumber: debitor.phoneNumber,
				receiverPhoneNumber: creditor.phoneNumber,
				amount: amount,
				date: getdate(Date.now()),
				time: gettime(Date.now())
			});
			creditor.save();
		});
		users.findOneAndUpdate({_id}, {amount: debitor.amount - amount}, {new: true}, (err, result) =>{
			if(err || !result) return res.status(403).json({error: "Debitor update failed"});
			debitor.transactionLogs.unshift({
	            status: 'Debit',
	            senderPhoneNumber: debitor.phoneNumber,
                receiverPhoneNumber: creditor.phoneNumber,
    	        amount: amount,
                date: getdate(Date.now()),
                time: gettime(Date.now())           
        	});
        	debitor.save();
    	});
    	return res.json({message: "successful"});
	})
}

exports.userTransactions = (req, res) => {
	const {_id} = req.profile;
	const user = users.findById(_id);
	if(!user) return res.status(403).json({error: "User doesn't exist"});
	return res.json({
		status: "true",
		Transaction_Logs: user.transactionLogs
	});
}