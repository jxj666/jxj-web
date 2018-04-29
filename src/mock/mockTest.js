/**
 * Created by 焦丙乾(jiaobingqian) on 2018/3/8.
 */
import Mock from 'mockjs'
var Random = Mock.Random;

/**
 * 用户管理列表
 */
Mock.mock('/api/login', {
  "data": {
    "perms": {
      "email": "jiaobingqian@we.com",
      "isAdmin": false,
      "isNeedResetPwd": false,
      "menuPerms": [
        {
          "description": "系统管理",
          "name": "系统管理",
          "permId": 2,
          "permission": "account:manage",
          "type": "MENU"
        },
        {
          "description": "用户管理",
          "name": "用户管理",
          "permId": 3,
          "permission": "application:user",
          "type": "MENU"
        },
        {
          "description": "角色管理",
          "name": "角色管理",
          "permId": 4,
          "permission": "application:role",
          "type": "MENU"
        },
        {
          "description": "进件查询",
          "name": "进件查询",
          "permId": 5,
          "permission": "application:query",
          "type": "MENU"
        },
        {
          "description": "任务管理",
          "name": "任务管理",
          "permId": 6,
          "permission": "application:task",
          "type": "MENU"
        },
        {
          "description": "待办任务",
          "name": "待办任务",
          "permId": 7,
          "permission": "application:todo",
          "type": "MENU"
        },
        {
          "description": "办结任务",
          "name": "办结任务",
          "permId": 8,
          "permission": "application:done",
          "type": "MENU"
        },
        {
          "description": "分配任务",
          "name": "分配任务",
          "permId": 9,
          "permission": "application:allocationTask",
          "type": "MENU"
        },
        {
          "description": "统计图标",
          "name": "统计图标",
          "permId": 10,
          "permission": "application:statistics",
          "type": "MENU"
        },
        {
          "description": "审核情况统计",
          "name": "审核情况统计",
          "permId": 11,
          "permission": "audit",
          "type": "MENU"
        },
        {
          "description": "账户审核情况统计",
          "name": "账户审核情况统计",
          "permId": 12,
          "permission": "accountAudit",
          "type": "MENU"
        },
        {
          "description": "实时审核情况统计",
          "name": "实时审核情况统计",
          "permId": 13,
          "permission": "actualTimeAudit",
          "type": "MENU"
        },
      ],
      "realName": "旺财"
    }
  },
  "message": "",
  "status": "0"
});

/**
 * 用户管理列表
 */
Mock.mock('/api/sysUser/getUserList', {
  "message": "",
  "data": {
    "pageUtil": {
      "count|100-400": 100, //’  结果总数’,
      "page|1-10": 1,     //第几页
      "pageCount": 3, //总页数
      "pageSize": 20,  //每页条数
    },
    "recordsTotal":100,
    "list|10": [
      {
        "id|+1": 1,
        loginName: /\w{5}/,
        realName: /\w{5}/,
        email: /\d{5}/,
        mobile: /\d{11}/,
        status: /ENABLE|DISABLE/,
        role:[
          {
            roleId: /1|2|3|4/,
            roleName: /信审管理员|系统管理员|信审员|超级管理员/,
          }
        ]
      }
    ]
  },
  "status": 0
});
/**
 * 角色列表
 */
Mock.mock('/api/sysRole/getRoleList', {
  "message": "",
  "data": {
    "roles": [
      {
        roleId: "1",
        roleName: "信审管理员",
        createDate:Random.datetime('yyyy-MM-dd'),
        permissionIds:["a","a1","b"],
      },
      {
        roleId: "2",
        roleName: "系统管理员",
        createDate:Random.datetime('yyyy-MM-dd'),
        permissionIds:["a","a2","c","c1"],
      },
      {
        roleId: "3",
        roleName: "信审员",
        createDate:Random.datetime('yyyy-MM-dd'),
        permissionIds:["a","a1","b"],
      },
      {
        roleId: "4",
        roleName: "超级管理员",
        createDate:Random.datetime('yyyy-MM-dd'),
        permissionIds:["d","d1","d3"],
      },
    ]
  },
  "status": 0
});

/**
 * 更新用户密码
 */
Mock.mock('/api/sysUser/updatePassword', {
  "message": "",
  "status": 0
});

/**
 * 注销
 */
Mock.mock('/api/sysUser/logout', {
  "message": "",
  "status": 0
});




/**
 * 更新用户状态
 */
Mock.mock('/api/sysUser/updateUserStatus', {
  "message": "",
  "status": 0
});

Mock.mock('/api/resource/tree', {
  "data":{
    "tree":
    [
      {
      "_id": "a",
      "resourceName": "系统管理",
      "resourceType": "menu",
      "icon": "fa fa-sitemap",
        "children": [{
          "_id": "a1",
          "resourceName": "用户管理",
          "resourceType": "menu",
          "icon": "fa fa-user",
        }],
      },
      {
        "_id": "b",
        "resourceName": "进件查询",
        "resourceType": "menu",
        "icon": "fa fa-sitemap",
      },
      {
        "_id": "c",
        "resourceName": "任务管理",
        "resourceType": "menu",
        "icon": "fa fa-sitemap",
        "children": [
          {
            "_id": "c1",
            "resourceName": "代办任务",
            "resourceType": "menu",
            "icon": "fa fa-user",
          },
          {
            "_id": "c2",
            "resourceName": "办结任务",
            "resourceType": "menu",
            "icon": "fa fa-user",
          },
          {
            "_id": "c3",
            "resourceName": "分配任务",
            "resourceType": "menu",
            "icon": "fa fa-user",
          },
        ],
      },
      {
        "_id": "d",
        "resourceName": "统计图标",
        "resourceType": "menu",
        "icon": "fa fa-sitemap",
        "children": [
          {
            "_id": "d1",
            "resourceName": "审核情况统计",
            "resourceType": "menu",
            "icon": "fa fa-user",
          },
          {
            "_id": "d2",
            "resourceName": "账户审核情况统计",
            "resourceType": "menu",
            "icon": "fa fa-user",
          },
          {
            "_id": "d3",
            "resourceName": "实时审核情况统计",
            "resourceType": "menu",
            "icon": "fa fa-user",
          },
        ],
      },
      
    ],
  },
  "message":"操作成功",
  "status":0
});


/**
 * 审核统计
 */
Mock.mock('/api/statistics/audit', {
  "message": "",
  "data": {
    "pageUtil": {
      "count|100-400": 100, //’  结果总数’,
      "page|1-10": 1,     //第几页
      "pageCount": 3, //总页数
      "pageSize": 20,  //每页条数
    },
    "recordsTotal":100,
    "list|10": [
      {
        "id|+1": 1,
        'date': Random.datetime('yyyy-MM-dd'),
        'total': /\d{5}/,
        'success': /\d{5}/,
        'fail': /\d{5}/,
        'time': /\d{5}/,
        'amount': /\d{5}/,
      }
    ]
  },
  "status": 0
});


/**
 * 账户审核统计
 */
Mock.mock('/api/statistics/accountAudit', {
  "message": "",
  "data": {
    "pageUtil": {
      "count|100-400": 100, //’  结果总数’,
      "page|1-10": 1,     //第几页
      "pageCount": 3, //总页数
      "pageSize": 20,  //每页条数
    },
    "recordsTotal":100,
    "list|10": [
      {
        "id|+1": 1,
        'date': Random.datetime('yyyy-MM-dd'),
        'total': /\d{5}/,
        'success': /\d{5}/,
        'fail': /\d{5}/,
        'time': /\d{5}/,
        'amount': /\d{5}/,
      }
    ]
  },
  "status": 0
});

/**
 * 实时审核统计
 */
Mock.mock('/api/statistics/actualTimeAudit', {
  "message": "",
  "data": {
    "pageUtil": {
      "count|100-400": 100, //’  结果总数’,
      "page|1-10": 1,     //第几页
      "pageCount": 3, //总页数
      "pageSize": 20,  //每页条数
    },
    "recordsTotal":100,
    "list|10": [
      {
        "id|+1": 1,
        'date': Random.datetime('yyyy-MM-dd'),
        'total': /\d{5}/,
        'success': /\d{5}/,
        'fail': /\d{5}/,
        'await': /\d{5}/,
        'complete': /\d{5}/,
        'todayTotal': /\d{5}/,
        'todayAwait': /\d{5}/,
        'todayComplete': /\d{5}/,
        'todayFail': /\d{5}/,
        'todaySuccess': /\d{5}/,
      }
    ]
  },
  "status": 0
});


export default Mock;
