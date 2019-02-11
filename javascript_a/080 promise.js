function imPromise(num) {
  return new Promise((resolve, reject) => {
    if (num>0.5) {
      resolve(1)
    } else {
      reject(0)
    }
  })
}
imPromise(Math.random()).then((v) => {
  console.log(v, 1)
}).catch((v) => {
  console.log(v, 0)
})