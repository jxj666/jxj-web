<template>
  <el-container style="height: 100%">
    <el-header>
      <div class="header-left">
        <h2>{{title}}</h2>
        <!--<el-switch-->
        <!--v-model="isCollapse"-->
        <!--active-color="#13ce66"-->
        <!--inactive-color="#ff4949">-->
        <!--</el-switch>-->
      </div>
      <div class="header-right">
        <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        {{realName || '管理员'}}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="alterPassword()">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="container">
      <transition :duration="1000">
        <el-aside width="200">
          <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
          <!--<el-radio-button :label="false">展开</el-radio-button>-->
          <!--<el-radio-button :label="true">收起</el-radio-button>-->
          <!--</el-radio-group>-->
          <el-menu :default-active="activeMenuIndex" :collapse="isCollapse" class="el-menu-vertical-demo"
                   background-color="#324157" text-color="#fff"
                   @select="handleSelect">
            <template v-for="menu in menuTree">

              <el-menu-item v-if="!menu.children" v-bind:index="menu.index">
                <i :class="[menu.icon || 'fa fa-navicon']"></i>
                <span slot="title"> {{menu.title}}</span>
              </el-menu-item>
              <el-submenu v-else v-bind:index="menu.index">
                <template slot="title">
                  <i :class="[menu.icon || 'fa fa-navicon']"></i>
                  <span slot="title"> {{menu.title}}</span>
                </template>
                <el-menu-item v-for="submenu in menu.children" v-bind:index="submenu.index" :key="submenu.index">
                  <i :class="[submenu.icon]"></i>
                  <span slot="title"> {{submenu.title}}</span>
                </el-menu-item>
              </el-submenu>

            </template>
          </el-menu>
        </el-aside>
      </transition>
      <el-main>

        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import menuTree from '@/config/menu'
  import auth from '@/utils/authenticate'
  import ajax from '@/utils/ajax'
  export default {
    name: "admin",
    data() {
      return {
        isCollapse: false,
        realName: '',
        title: '好分期人工信审系统',
        menuTree: []
      }
    },
    methods: {
      handleSelect(index, indexPath) {
        this.$router.push({path: '/admin/' + index});
      },
      alterPassword () {
        this.$router.push({path: '/admin/resetPassword'});
      },
      logout () {
        var router = this.$router;

        this.$confirm('此操作将退出当前系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax({
            url: "/logout",
            type: "get",
            data: {},
            contentType: "application/json",
            success: function (response) {
              auth.logout();
              router.push({path: '/login'})
            },
            error: function (response) {
              this.$notify.error({
                title: '错误',
                message: response.message ||  "未知错误"
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消操作'
          });
        });
      },
    },
    created() {
      this.realName = auth.getRealName();
      // 全量菜单 ==> 可见菜单
      if (!auth.isAdmin()) {
        this.menuTree = menuTree.filter((menu) => {
          if (auth.hasPermission(menu.permission)) {
            if (menu.children) {
              menu.children = menu.children.filter((subMenu) => {
                if (auth.hasPermission(subMenu.permission)) {
                  return true;
                }
              });
            }
            return true;
          }
          return false;
        });
      } else {
        this.menuTree = menuTree;
      }
    },
    computed: {
      activeMenuIndex() {
        var segments = this.$route.path.split('/');
        // console.log(segments)
        return segments[segments.length - 1];
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-container {
    height: 100%;
    width: 100%;
    min-width: 950px;
  }
  .container{
    position: relative;
  }

  .el-header {
    background-color: #1f2d3d;
    color: #333;
    width: 100%;
    padding: 0 20px;
  }

  .el-header > .header-left {
    float: left;
    color: #b7c3d2;

  }

  .el-header > .header-left h2 {
    position: relative;
    top: -5px;
  }

  .el-header > .header-right {
    float: right;
    margin-top: 18px;
  }

  .el-header > .header-right .el-dropdown {
    color: #b7c3d2;
  }

  .el-aside {
    background-color: #324157;
    color: #333;
  }

  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    padding: 0;
    height:100%;
    width: -moz-calc(100% - 200px);
    width: -webkit-calc(100% - 200px);
    width: calc(100% - 200px);
    min-width: 750px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: width .5s;
  }

  .fade-enter, .fade-leave-to {
    width: 64px
  }

  .el-menu {
    border-right: 0;
  }

  .tab-page, .el-tabs {
    height: 100%;
  }

  .el-tabs--border-card {
    border-bottom: none;
    box-shadow: none;
  }

  .right {
    float: right;
  }
</style>
