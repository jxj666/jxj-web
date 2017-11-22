//promise

const promise = new Promise(function(resolve, reject) {
    if (ajax) {
        resolve(value);
    } else {
        reject(error);
    }
});