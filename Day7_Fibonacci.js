function fibbo (input){
	var inputErrMsg = "Requires a positive integer";

	if (input === null || isNaN(input)) {
		throw new TypeError(inputErrMsg);
	}

	if (!isFinite(input) || input < 1) {
		throw new RangeError(inputErrMsg);
	}

	number = Math.floor(input);

	var arr = [0,1];

	for(x = 2; x <= number; x++){
		index = arr[x-1] + arr[x-2];
		arr.push(index)
	}

	return(arr[number-1]);
}