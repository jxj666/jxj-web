//promise 
const p1 = new Promise(function(resolve, reject) {

});
const p2 = new Promise(function(resolve, reject) {
    resolve(p1);
});