var content='hello world'
var myHeaders=new Headers({
	'Content-Type':'text/plain',
	'Content-Length':content.length.toString(),
	'X-Custom-Header':'ProcessThisImmediately',
})

