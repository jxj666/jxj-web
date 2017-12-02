var age = '12';
var people = {
    name: 'jxj'
}

function intro(num, obj) {
    num = '18';
    obj.name = 'yy';
    console.log(num, obj);
}
intro(age, people);
console.log(age, people);