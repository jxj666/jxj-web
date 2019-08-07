// vue不允许添加根级响应式属性
var vm = new Vue({
    data: {
        message: ''
    },
    template: '<div>{{message}}</div>'
});
vm.message = 'hello';