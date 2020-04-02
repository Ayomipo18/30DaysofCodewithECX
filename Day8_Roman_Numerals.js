function arabicToRoman(number){
  let roman = "";
  let x;
  const romanNumList = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XV:40, X:10, IX:9, V:5, IV:4, I:1};
  if(number < 1 || number > 3999)
    return "Enter a number between 1 and 3999";
  else{
    for(let key in romanNumList){
        x = Math.floor(number / romanNumList[key]);
        if(x >= 0){
            for(let i = 0; i < x; i++){
              roman += key;
            }
          }
        number = number % romanNumList[key];
    }
  }

  return roman;
}