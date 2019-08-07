try {
    let res = fetch(url)
    ler data = res.json()
    console.log(data)
} catch (e) {
    console.log(e)
}