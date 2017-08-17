Vue.component('my-button', {
    template: '<button @click="add">{{num}}</button>',
    data: function() {
        return { num: 0 }
    },
    methods: {
        add: function() {
            this.num += 1
            this.$emit("add_num");
        }
    }
});
new Vue({
    el: '#app',
    data: {
        total: 0
    },
    methods: {
        addTotal: function() {
            this.total += 1;
        }
    }
});