$(document).ready(main)
function main(){
$.ajax({
	type:'get',
	URL:'https://easy-mock.com/mock/5af53cd08efab658654cbd71/test/api/str',
	success:str_html
})	
}
function str_html(data){
	console.log(data)
}