const users = require('../models/user');

exports.getUser = (req, res) => {
	const { email } = req.body;	

	const user = users.find(user => user.email === email);
   
     //if no user has that email, return error message
	if(!user) res.status(403).json({error : "User does not exist"});

	const { dateCreated } = user;

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
	let time = gettime(dateCreated);
	let date = getdate(dateCreated);

	return res.json({
		email, date, time
	})

}