/**
 * Created by webtinycoder <1242680583@qq.com> on 18/3/2.
 *
 */
const menuTree = [{
    permission: "home",
    index: "",
    title: "首页",
    icon: "fa fa-fw fa-home"
  },
  {
    permission: "system:manage",
    index: "systemManage",
    title: "系统管理",
    icon: "fa fa-fw fa-user-plus",
    children: [
      {
        permission: "sysUser:manage",
        index: "userManage",
        title: "用户管理",
        icon: "fa fa-fw fa-user"
      },
      {
        permission: "role:manage",
        index: "roleManage",
        title: "角色管理",
        icon: "fa fa-fw fa-group"
      }
    ]
  },
  {
    permission: "application:manage",
    index: "applicationList",
    title: "进件查询",
    icon: "fa fa-fw fa-newspaper-o"
  },
  {
    permission: "task:manage",
    index: "taskManage",
    title: "任务管理",
    icon: "fa fa-fw fa-tasks",
    children: [
      {
        permission: "commission:manage",
        index: "todoTask",
        title: "待办任务",
        icon: "fa fa-fw fa-square-o"
      },
      {
        permission: "finish:manage",
        index: "doneTask",
        title: "办结任务",
        icon: "fa fa-fw fa-check-square-o"
      },
      {
        permission: "distribution:manage",
        index: "allocationTask",
        title: "分配任务",
        icon: "fa fa-fw fa-exchange"
      }
    ]
  },
  // {
  //   permission: "count:manage",
  //   index: "statisticsManage",
  //   title: "统计图表",
  //   icon: "fa fa-fw fa-table",
  //   children: [
  //     {
  //       permission: "count:verifyCount",
  //       index: "audit",
  //       title: "审核情况统计",
  //       icon: "fa fa-fw fa-list"
  //     },
  //     {
  //       permission: "count:UserVerifyCount",
  //       index: "accountAudit",
  //       title: "账户审核情况统计",
  //       icon: "fa fa-fw fa-user-circle-o"
  //     },
  //     {
  //       permission: "count:actualVerifyCount",
  //       index: "actualTimeAudit",
  //       title: "实时审核情况统计",
  //       icon: "fa fa-fw fa-hourglass-2"
  //     }
  //   ]
  // }
];

export default menuTree;
