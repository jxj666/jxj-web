<!--
 * @Description: 
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:32:00
 -->

<!-- 父 -->
<my-awesome-list :items='items'>
    <li slot='item' slot-scope='props'>
    	{{ props.text }}
    </li>
</my-awesome-list>
<!-- 子 -->
<ul>
    <slot name='item' v-for='item in items' :text='item.text'></slot>
</ul>