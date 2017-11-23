//promise 
const p1 = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000);
});

const p2 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(p1), 1000);
});

p2.then(result => console.log('then:' + result)).catch(error => console.log('catch:' + error));