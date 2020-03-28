var Day = new Date().getDay();
var Hours = new Date().getHours();
var Minutes = new Date().getMinutes();
var Seconds = new Date().getSeconds();

function todayDate(){
if(Day===0){
	console.log("Today is Sunday")
}
else if(Day===1){
	console.log("Today is Monday")
}
else if(Day===2){
	console.log("Today is Tuesday")
}
else if(Day===3){
	console.log("Today is Wednesday")
}
else if(Day===4){
	console.log("Today is Thursday")
}
else if(Day===5){
	console.log("Today is Friday")
}
else if(Day===6){
	console.log("Today is Saturday")
}
else{
	console.log("error")
};
console.log("Current time is " + Hours + ":" + Minutes + ":" + Seconds + " " + PMorAM())
};

function PMorAM(){
	if(Hours>=12){
		return("PM")
	}
	else if(Hours<=12){
		return("AM")
	}
};

console.log("Type todayDate() to view the current Date and Time");