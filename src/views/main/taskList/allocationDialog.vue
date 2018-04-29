<template>
  <div class="">
    <el-dialog  :visible.sync="dialogTableVisible" center >
      <el-form :inline="true" class="demo-form-inline" :model="queryParams">
        <el-form-item>
          <el-select  placeholder="角色" size="small" width="120" v-model="queryParams.roleId">
            <el-option label="全部" value=" "></el-option>
            <el-option
              v-for="item in roles"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定人员:">
          <el-input  v-model="queryParams.userName" size="small" style="width:120px"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button   type="primary" size="small" @click="getUserRoleList">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="userRoleList"
        border
        size="small"
        height="335"
        style="width: 100%">
        <el-table-column
          prop="realName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button  type="primary" size="small" @click="openAlloctionDialog(scope.row)">分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog  :visible.sync="allocationVisible" center>
      <div style="text-align:center"><h2>请确认是否分配给 "{{userInfo.realName}}"</h2></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocationVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocationTask">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ajax from "@/utils/ajax"
  export default {
    props: [ 'selectTask'],
    data () {
      return {
        dialogTableVisible: false,
        allocationVisible: false,
        userRoleList: [],
        roles: [],
        userInfo: {},
        queryParams: {
          roleId: '',
          userName: ''
        }

      }
    },
    mounted(){
        this.$on('show', () => {
           this.dialogTableVisible = true
           this.getRole()
           this.getUserRoleList()
           this.queryParams.roleId = ''
           this.queryParams.userName = ''
        })
    },
    methods: {
      openAlloctionDialog (row) {
        this.userInfo = row
        this.allocationVisible = true
      },
      allocationTask () {
        let applicationIds = this.selectTask.map((item) => {
          return item.applicationId
        })
        let _this = this
        ajax({
          url: '/application/distribute',
          params: { applicationId: applicationIds.join(','), userId: _this.userInfo.userId},
          success(res){
            _this.dialogTableVisible = false
            _this.allocationVisible = false
            _this.$notify({
              title: '成功',
              message: '分配成功',
              type: 'success'
            });
            _this.$emit('loadList')
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
            _this.dialogTableVisible = false
            _this.allocationVisible = false
          }
        })
      },
      getUserRoleList(){
        let _this = this
        ajax({
          url: '/sysUser/getUserRoleList',
          contentType:'application/x-www-form-urlencoded;',
          isFormData: true,
          data: _this.queryParams,
          success(res){
            _this.userRoleList = res.data
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
      getRole() {
        let _this = this
        ajax({
          url: '/sysRole/getSysUserRoleList',
          success(res){
            _this.roles = res.data.roles
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      }
    },
    components: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-small {
  width: 200px
}
</style>
