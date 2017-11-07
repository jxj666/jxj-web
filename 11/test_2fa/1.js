var tfa =require('2fa');
var my_key='';
tfa.generateKey(32,function(err,key){
	my_key=key;
})
var tc=Math.floor(Date.now()/1000/30);
var totp=tfa.generateCode(my_key,tc);
console.log(totp);