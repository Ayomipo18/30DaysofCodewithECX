function converter(str){
	try{
		let num = Number(str);
		if(isNaN(num)){throw new TypeError('Error')}
		return num;
	}
	catch(err){
		return err;
	}
}	

console.log(converter("[2,4]"));
console.log(converter("2"));