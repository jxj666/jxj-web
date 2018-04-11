var url = `网路地址`
fentch(url).then((res) => {
    if (res.ok) {
        res.blob().them((myBlob) => {
            console.log(myBlob)
        })
    } else {
        console.log('Network Error')
    }
}).catch((e) => {
    console.log(e)
})