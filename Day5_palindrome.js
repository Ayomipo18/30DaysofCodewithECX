function palindrome(str){
	var re = /[\W_]/g;
	var lowRegStr = str.toLowerCase().replace(re,'');
	var reverseStr = lowRegStr.split('').reverse().join('');
	return reverseStr === lowRegStr;
}

console.log(palindrome("Was it a car or a cat I saw?"));