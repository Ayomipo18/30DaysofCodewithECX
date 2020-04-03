function validateEmail(email){      
   var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   return emailPattern.test(email); 
 } 

 console.log(validateEmail("ayomipo@gmail.com"))