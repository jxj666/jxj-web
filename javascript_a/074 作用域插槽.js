<!-- 子 -->
<div class="child">
    <solt text='hello from child'></solt>
</div>
<!-- 父 -->
<div class="parent">
    <child>
        <template slot-scope='props'>
            <span>hello from parent</span>
            <span>{{props.text}}</span>
        </template>
    </child>
</div>