const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
        trim: true,
        required: true
	},
	hash: {
		type: String,
        required: true
	},
	names: {
		type: [],
		trim: true,
		required: true
	},
	occupation: {
		type: String,
		trim: true,
		required: true,
	},
	date_created: {
        type: Date,
        default: Date.now
    },
    lastlogin: {
    	type: Date	
    }
});

module.exports = mongoose.model("User", userSchema);