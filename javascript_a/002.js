//this

//1
var my = {
    name: 'jxj',
    intro: function(name) {
        console.log(`my name is ${name}`);
    }
}
my.intro(my.name);

//2
var my={
	name:'jxj',
	intro:function(self){
		console.log(`my name is ${self.name}`);
	}
}
my.intro(my);

//3
var my={
	name:'jxj',
	intro:function(){
		console.log(`my name is ${this.name}`);
	}
}
my.intro();
