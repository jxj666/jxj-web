(async function () {
  console.log(1)
  await new Promise(function (resolve, reject) {
    'use strict'
    setTimeout(function () {
      console.log(2)
      resolve();
    }, 1000)
  })
  console.log(3)
}())


!async function () {
  console.log(1)
  await new Promise(resolve => {
    'use strict'
    setTimeout(() => {
      console.log(2)
      resolve();
    }, 1000)
  })
  console.log(3)
}()