//promise 对象 状态 不会抛出错误
const promise = new Promise(function(resolve, reject) {
  if (true) {
    resolve();
  } else {
    reject();
  }
});

promise.then(
  a => {},
  b => {},
);
