<!--
 * @Description: 
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:34:25
 -->

 <template>
  <!-- 子 -->
  <div class='child'>
    <solt text='hello from child'></solt>
  </div>
</template>
 
<template>
  <!-- 父 -->
  <div class='parent'>
    <child>
      <template slot-scope='props'>
        <span>hello from parent</span>
        <span>{{props.text}}</span>
      </template>
    </child>
  </div>
</template>
