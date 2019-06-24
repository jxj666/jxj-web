var myHeaders = new Headers()
var myInit = {
    method: 'GET',
    header: myHeaders,
    mode: 'cors',
    cache: 'default',
}
fetch('url', myInit).then(res => res.json()).then(data => console.log(data))