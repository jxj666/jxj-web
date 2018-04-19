<!-- //vue -->
<!-- //双向数据绑定 -->
<input type="text" name="text" v-model='something'>
<input type="text" name="text" :value='something' @input='something=$event.target.value'>
<!-- //组件简写 -->
<custom-input :value='something' @input='something=anguments[0]'></custom-input>
<!-- 示例 -->
<!-- 父 -->
<currency-input v-model='price'></currency-input>
<!-- 子 -->
<script type="text/javascript">
Vue.component('currency-input', {
    themplate: ' <input type = "text" name = "text" ref = "input" :value = "value" @input = "updataValue($event.target.value)" > ',
    props: ['value '],
    methods: {
        updateValue: function(value) {
            var formatedValue = value.trim().slice(0, value.indexOf('.') === -1 ? value.length : value.indexOf('.') + 3);
            if (formatedValue !== value) {
                this.$refs.input.value = formatedValue;
            }
            this.$emit('input', Number(formattedValue));
        }

    }
})
</script>