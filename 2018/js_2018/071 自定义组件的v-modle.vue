<!--
 * @Description: 
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:35:00
 -->
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
});
</script>


<!-- 父 -->
<my-checkboox v-model='foo' value='some value'></my-checkboox>
<!-- 等价于 -->
<my-checkboox :checked='foo' @change='val={foo=val}' value='some value'></my-checkboox>