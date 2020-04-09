const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let dromes = [];

const palindrome = str => {
	let re = /[\W_]/g;
	let lowRegStr = str.toLowerCase().replace(re,'');
	let reverseStr = lowRegStr.split('').reverse().join('');
	return reverseStr === lowRegStr;
}

app.post("/createdata", (req, res) => {
	let words = req.body.words;
	dromes = words.filter(word => palindrome(word));
 	return res.json("Request sent");
})

app.get("/getdata", (req, res) => {
	return res.json({dromes});
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server running on port 3000")
});