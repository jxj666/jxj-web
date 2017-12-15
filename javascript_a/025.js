// 异步更新队列


/*
html:
<div id="example">{{message}}</div>	
*/

var vm=new Vue({
	el:'#example',
	data:{
		message:'123'
	}
})
vm.message='new message'
vm.$el.textContent === 'new message'
Vue.nextTick(function(){
	vm.$el.textContent === 'new messages'
})
