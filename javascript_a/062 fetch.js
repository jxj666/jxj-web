// fetch
fetch(url).then(function(res) {
    return res.json()
}).then(function(data) {
    console.log(data)
}).catch(function(e) {
    console.log(e)
})


//fentch
fetch(url).then(res => res.json()).then(data => console.log(data)).catch(e => console.log(e))