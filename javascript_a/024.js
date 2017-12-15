// 异步更新队列-组件
Vue.component('example', {
    template: '<span>{{mesage}}</span>',
    data: function() {
        return {
            message: '没有更新'
        }
    },
    methods: {
        updateMessage: function() {
            this.message = '更新完成'
            console.log(This.$el.textContent)
            this.$nextTick(function() {
                console.log(this.$el.textContent)
            })
        }
    }
});