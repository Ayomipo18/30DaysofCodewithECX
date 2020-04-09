const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let data = {};

app.post("/create", (req, res) => {
	data = {data: req.body};
 	return res.json("Request sent");
})

app.get("/get", (req, res) => {
	return res.json(data);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server running on port 3000")
});