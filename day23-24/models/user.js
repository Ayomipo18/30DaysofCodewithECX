const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
        trim: true,
        required: true,
        unique: true
	},
	phoneNumber: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	hash: {
		type: String,
        required: true
	},
	hashPin: {
		type: String,
		trim: true,
		required: true
	},
	amount: {
		type: Number,
		default: 0
	},
	transactionLogs: {
		type: Array,
		default: []
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