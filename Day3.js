function vowels(str){
	var vowel_list = 'aeiouAEIOU';
	var vcount = 0;

	for(var x =0; x < str.length; x++){
		if(vowel_list.indexOf(str[x]) !== -1){
			vcount +=1;
		}
	}
	console.log(vcount);
}

console.log("type vowels(input string) to get number of vowels in the input string");