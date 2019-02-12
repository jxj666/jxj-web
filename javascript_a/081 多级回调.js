getData(a => {
  getMoreData(a, b => {
    getMoreData(b, c => {
      console.log(c)
    })
  })
})


getData().then(a => getMoreData(a)).then(b => getMoreData(b)).then(c => console.log(c))

(async () => {
  const a = await getData()
  const b = await getMoreData(a)
  const c = await getMoreData(b)
  console.log(c)
})