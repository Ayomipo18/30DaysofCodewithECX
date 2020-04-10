const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let courses = [];

const gradePoint = num => {
	if(num < 40) return 0;
	else if(num < 45) return 1;
	else if(num < 50) return 2;
	else if(num < 60) return 3;
	else if(num < 70) return 4;
	return 5;
 }

const calcSGPA = data => {
 	let totalUnits = data.reduce((accumulator, course) => accumulator + course.units , 0);
 	let totalGradePoints = data.reduce((accumulator, course) => accumulator + (course.units * gradePoint(course.score)), 0)
 	let sgpa = totalGradePoints / totalUnits;
 	return sgpa;
 }

app.post("/createdata", (req, res) => {
	const { courses : data } = req.body;
	courses = data;
	return res.json("Request sent");
});

app.get("/getdata", (req, res) => {
	let SGPA = calcSGPA(courses);
	return res.json({
		sgpa : SGPA});
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server running on port 3000")
});