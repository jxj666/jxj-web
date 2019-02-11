async function imAsync(num) {
  if (num > 0.5) {
    return num
  } else {
    throw num
  }

}

imAsync(Math.random()).then((v) => {
  console.log(v,1)
}).catch((v) => {
  console.log(v,0)
})