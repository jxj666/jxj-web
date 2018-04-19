<!-- //html -->
<script type="text/javascript">
Vue.component('my-checkboox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean,
        value: String
    }
})
</script>
<!-- 父 -->
<my-checkboox v-model='foo' value='some value'></my-checkboox>
<!-- 等价于 -->
<my-checkboox :checked='foo' @change='val={foo=val}' value='some value'></my-checkboox>