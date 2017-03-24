var text1 = document.getElementsByName('shuru')[0]
var btn1 = document.getElementsByName('btn')[0]
btn1.onclick = function() {
	var html = ''
	var n = text1.value;
	if(n<0 || n>20){alert('输入数字错误');return;}
	var w1;
	if (shuchu.currentStyle) {
		w = shuchu.currentStyle.width;
	} else {
		w = getComputedStyle(shuchu, false).width;
	}
	var w_f = parseInt(w) / n;
	for (var i = 0; i < n * n; i++) {
		html += `<div onclick='alert(${i+1})'>${i+1}</div>`
	}
	html += `<style>#shuchu div{width:${w_f}px}</style> `
	shuchu.innerHTML = html;
}