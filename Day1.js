var number1 = window.prompt("Enter a number"); 
var number2 = window.prompt("Enter another number"); 
var result1 =  process()[0];
var result2 =  process()[1];

if(result1===1 && result2===1){
	console.log("Both are Positive Numbers");
}
else if(result1===1 && result2===-1){
	console.log("First Number is Positive");
	console.log("Second Number is Negative");
}
else if(result1===-1 && result2===1){
	console.log("First Number is Negative");
	console.log("Second Number is Positive");
}
else if(result1===-1 && result2===-1){
	console.log("Both are Negative Numbers");
}
else if(result1===0 && result2===1){
	console.log("First Number is zero");
	console.log("Second Number is Positive");
}
else if(result1===0 && result2===-1){
	console.log("First Number is zero");
	console.log("Second Number is Negative");
}
else if(result1===1 && result2===0){
	console.log("First Number is Positive");
	console.log("Second Number is zero");
}
else if(result1===-1 && result2===0){
	console.log("First Number is Negative");
	console.log("Second Number is zero");
}
else if(result1===0 || result2===0){
	console.log("Zero");
}
else{
	console.log("Error")
}

function process(){
var output1 = Math.sign(number1);
var output2 = Math.sign(number2);
return [output1, output2];
 };