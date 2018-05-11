$(document).ready(main)
function main(){
$.ajax({
	type:'GET',
	url:'https://easy-mock.com/mock/5af53cd08efab658654cbd71/test/api/str',
	success:str_html
})	
}
function str_html(data){
	if(data.code == 1){
		var html1=data.data.str
		$('#before').html(html1)
		//全匹配
		$('#complete1').html(html1.replace(/<\s?(\w*?)\s?>/gi,`<$1 class='light'>`))
		// 选择匹配
		$('#complete2').html(html1.replace(/<\s?(p|span)\s?>/gi,`<$1 class='light'>`))
	}
}