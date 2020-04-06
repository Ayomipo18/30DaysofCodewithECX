function nextBirthday(dob){

let birthday = new Date(dob);
let today = new Date();
birthday.setFullYear(today.getFullYear());

if (today > birthday) {
  birthday.setFullYear(today.getFullYear() + 1);
}

return Math.ceil((birthday - today) / (1000*60*60*24)) + ' days';
}

//Date of Birth Format : MM-DD-YY
nextBirthday("10-13-1998")