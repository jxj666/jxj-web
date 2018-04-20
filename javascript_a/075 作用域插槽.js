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