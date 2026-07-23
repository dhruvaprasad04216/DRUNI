function checkPassword(){

let pass = document.getElementById("password").value;

if(pass==="DRUNI"){

window.location.href="home.html";

}

else{

document.getElementById("wrong").innerHTML="❌ Wrong Password";

}

}