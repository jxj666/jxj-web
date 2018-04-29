import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import CallCenter from "@/components/CallCenter"
import Home from '@/views/main/Home'
//进件查询
import ApplicationList from '@/views/main/applicationList/applicationList'

import ErrorPage from '@/views/main/404'
import UserList from '@/views/main/system/user/list'
import RoleList from '@/views/main/system/role/manage'
import Audit from '@/views/main/statistics/audit'
import AccountAudit from '@/views/main/statistics/accountAudit'
import ActualTimeAudit from '@/views/main/statistics/actualTimeAudit'
// 任务列表
import AllocationTask from '@/views/main/taskList/allocationTask'  // 分配任务
import DoneTask from '@/views/main/taskList/doneTask'  //办结任务
import TodoTask from '@/views/main/taskList/todoTask'  // 代办任务

import ResetPassword from '@/views/main/account/resetPassword'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      meta: {
        requiresAuth: true
      },
      redirect: function () {
        return '/login';
      }
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requiresAuth: false
      },
      component: Login,
    },
    {
      path: '/firstLogin',
      name: 'firstLogin',
      meta: {
        requiresAuth: false
      },
      component: (resolve) => require(['../views/firstLogin.vue'], resolve),
    },
    {
      path: '/callcenter',
      name: 'callcenter',
      meta: {
        requiresAuth: false
      },
      component: CallCenter,
    },
    {
      path: '/admin',
      component: Admin,
      children: [{
          path: 'helloWorld',
          name: 'helloWorld',
          component: HelloWorld,
        },
        {
          path: '',
          name: 'home',
          meta: {
            requiresAuth: true
          },
          component: Home,
        },
        {
          path: 'resetPassword',
          name: 'resetPassword',
          meta: {
            requiresAuth: true
          },
          component: ResetPassword,
        },
        {
          path: 'userManage',
          name: 'userManage',
          meta: {
            permission: "sysUser:manage",
            requiresAuth: true
          },
          component: UserList,
        },
        {
          path: 'roleManage',
          name: 'roleManage',
          meta: {
            permission: "role:manage",
            requiresAuth: true
          },
          component: RoleList,
        },
        {
          path: 'applicationList',
          name: 'applicationList',
          meta: {
            permission: "application:manage",
            requiresAuth: true
          },
          component: ApplicationList,
        },
        {
          path: 'allocationTask',
          name: 'allocationTask',
          meta: {
            permission: "distribution:manage",
            requiresAuth: true
          },
          component: AllocationTask,
        },
        {
          path: 'doneTask',
          name: 'doneTask',
          meta: {
            permission: "finish:manage",
            requiresAuth: true
          },
          component: DoneTask,
        },
        {
          path: 'todoTask',
          name: 'todoTask',
          meta: {
            permission: "commission:manage",
            requiresAuth: true
          },
          component: TodoTask,
        },
        {
          path: 'audit',
          name: 'audit',
          meta: {
            requiresAuth: true
          },
          component: Audit,
        },
        {
          path: 'accountAudit',
          name: 'accountAudit',
          meta: {
            requiresAuth: true
          },
          component: AccountAudit,
        },
        {
          path: 'actualTimeAudit',
          name: 'actualTimeAudit',
          meta: {
            requiresAuth: true
          },
          component: ActualTimeAudit,
        },
        {
          path: '*',
          name: '404',
          meta: {
            requiresAuth: true
          },
          component: ErrorPage,
        }
      ]
    }
  ]
})
