<template>
  <tab-page ref="tabPage">
    <template slot="userListTabPage">
      <data-table :data-table="dataTable" ref="dataTable">
        <div slot="conditions" >
          <el-form :inline="true" :model="queryParams">
            <el-form-item>
              <div style="display: inline-block; vertical-align: middle;">用户搜索</div>
            </el-form-item>

            <el-form-item>

              <el-select v-model="queryParams.key" clearable filterable placeholder="请选择"
                         size="small">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="queryParams.value"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch" size="small">查询
              </el-button>
            </el-form-item>

            <el-form-item class="right">
              <el-button type="primary" @click="add" size="small">新建用户
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <template slot="columns">
          <el-table-column type="index"
                           align="center"
                           width="80"
                           label="序号">
          </el-table-column>
          <el-table-column prop="loginName"
                           align="center"
                           min-width="150"
                           label="登录名">
          </el-table-column>
          <el-table-column prop="realName"
                           label="姓名"
                           width="120"
                           align="center">
          </el-table-column>
          <el-table-column prop="email"
                           align="center"
                           width="100"
                           label="邮箱">
          </el-table-column>
          <el-table-column prop="mobile"
                           align="center"
                           width="100"
                           label="手机">
          </el-table-column>
          <el-table-column prop="role"
                           align="center"
                           :formatter="formatRoles"
                           label="角色">
          </el-table-column>
          <el-table-column
            align="center"
            label="使用状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter" :key="scope.row.status">
                {{scope.row.status == 'ENABLE' ? '使用中' : '已停用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="260">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="edit(scope.row, scope.column)">
                编辑
              </el-button>
              <el-button type="danger" size="small" @click="editStatus(scope.row, scope.column,'DEL')">
                删除
              </el-button>
                <el-button v-if="scope.row.status=='DISABLE'" type="success" size="small" @click="editStatus(scope.row, scope.column,'ENABLE')">
                      启用
                </el-button>
                <el-button v-else type="warning" size="small" @click="editStatus(scope.row, scope.column,'DISABLE')">
                        停用
                </el-button>
            </template>
          </el-table-column>
        </template>
      </data-table>
      <content-form
        :dialogInfo="dialogInfos"
        :dialogFormVisible="dialogVisible"
        :roleOptions="roleList"
        @submitForm="submitForm"
        v-on:closeDialog="closeDetailDialog">
      </content-form>
    </template>
  </tab-page>
</template>

<style scoped>

</style>
<script>
  import DataTable from "../../../../components/DataTable"
  import TabPage from "../../../../components/TabPage"
  import ContentForm from "./form"
  import ajax from "../../../../utils/ajax"
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";

  export default{
    components: {
      ElButton,
      DataTable,
      TabPage,
      ContentForm,
    },
    data(){
      return {
        typeOptions: [
          {
            value: 'LOGIN_NAME',
            label: '登录名'
          },
          {
            value: 'EMAIL',
            label: '邮箱'
          },
          {
            value: 'REAL_NAME',
            label: '姓名'
          }
        ],
        roleList: [],
        queryParams: {
          key: 'REAL_NAME',
          value: ''
        },
        dataTable: {
          pageSize: 10,
          pageSizes: [10, 20, 50, 100],
          url: '/sysUser/getUserList',
          type: 'post',
          emptyText: '没有记录',
          contentType:'application/x-www-form-urlencoded;',
          isFormData: true,
        },
        dialogInfos: {
          dialogType: 'add',
          form: {
            id: null,
            loginName: null,
            realName: null,
            email: null,
            mobile: null,
            status: null,
            roleId: null,
          },
          disabled: false,
        },
        dialogId: "",
        dialogVisible: false,
      }
    },
    filters: {
      statusFilter(item) {
        var index;
        index = item == 'ENABLE' ? 0 : 1;
        const itemsMap = {
          0: 'primary',
          1: 'danger',
        };

        return itemsMap[index]
      },
    },
    created(){
      this.getRoles();
    },
    mounted(){
      var defaultPage = {
        label: "用户管理",
        name: "default",
        slotName: 'userListTabPage',
        closable: false
      };
      this.$refs.tabPage.$emit("open-tab", defaultPage);

    },
    methods: {
      /**
       * 清空form表单数据
       */
      clearForm(){
        this.dialogInfos = {
          dialogType: 'add',
          form: {
            id: null,
            loginName: null,
            realName: null,
            email: null,
            mobile: null,
            status: null,
            roleId: null,
          },
          disabled: false
        };
      },
      formatRoles(row,column,cellValue){
        return row.role && row.role.length ? row.role.map((item)=>item.roleName).join('／'): row.role;
      },
      formatRoleIds(arrRoles){
        return arrRoles && arrRoles.length ? arrRoles.map((item)=>item.roleId): arrRoles;
      },
      getRoles(){
        ajax({
          url: `/sysRole/getRoleList`,
          type: 'post',
          params: {
          	roleName: '',
            mark: 'sysuser'
          },
          dataType: 'json',
          success: (res) => {
            let data = res.data || []
            this.roleList = data.map( item => {
            	return {
            		value: item.id,
                label: item.name
              }
              }) || [];
          },
          error: (res) => {
            this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        });
      },
      enableSubmit(){
        this.dialogInfos.disabled = false;
      },
      showDetailDialog(index, obj){
        this.dialogVisible = true;
      },
      closeDetailDialog(){
        this.dialogVisible = false;
      },
      onSearch: function () {
        this.dataTable.queryParams = this.queryParams;
//        if (!this.queryParams.key) {
//          this.$notify({
//            title: '警告',
//            message: '请选择查询类型',
//            type: 'warning'
//          });
//          return false;
//        }
        if (this.queryParams.key && !this.queryParams.value) {
          this.$notify({
            title: '警告',
            message: '请输入查询内容',
            type: 'warning'
          });
          return false;
        }
        this.dataTable.url = '/sysUser/getUserList';
        this.$refs.dataTable.$emit('load-data');
      },
      add: function () {
        this.dialogInfos.dialogType = 'add';
        this.clearForm();
        this.showDetailDialog();
      },
      edit: function (row, column) {
        this.dialogInfos.dialogType = 'edit';
        this.dialogInfos.form = row;
        this.dialogInfos.form.roleId = this.formatRoleIds(row.role);
        this.dialogId = row.userId;
        this.showDetailDialog();
      },
      editStatus: function (row, column, status) {
        let statusMessage;
        let url = '/sysUser/updateUserStatus';

        if (status == 'ENABLE') {
          statusMessage = "确认启动该用户";
        } else if (status == 'DISABLE') {
          statusMessage = "确认停用该用户";
        } else if (status == 'DEL') {
          statusMessage = "确认删除该用户";
          url = '/sysUser/delUser';
        }
        this.$confirm(statusMessage, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax({
            url: url,
            type: 'post',
            data: {
            	userId: row.userId,
              status
            },
            contentType:'application/x-www-form-urlencoded;',
            isFormData: true,
            dataType: 'json',
            success: (res) => {
              this.$notify.success({
                title: '成功',
                message: '操作成功了'
              });
              this.$refs.dataTable.$emit('load-data');
            },
            error: (err) => {
              let error = err.message || err;
              err.message && this.$alert(error, '', {
                type: "error",
                confirmButtonText: "知道了",
                callback: action => {

                }
              });
            }
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      /**
       * 详情页面form表单数据提交
       */
      submitForm(...args){

        var requestType = args[0];
        var formData = args[1];
        var userId = args[2];
        var optionType = 'post';
        var optionUrl = '/sysUser/add';
        var successText = '新建成功';
        if (requestType === 'edit') {
          optionUrl = '/sysUser/update';
          formData.userId = userId;
          successText = '更新成功';
        }
        formData.businessChannel = ['HAOHUAN'];
//        formData.roleId = formData.roleId.join(',');
        ajax({
          url: optionUrl,
          type: optionType,
          data:  formData,
//          contentType:'application/x-www-form-urlencoded;',
//          isFormData: true,
          dataType: 'json',
          success: (res) => {
            this.$alert(successText, '', {
              type: "success",
              confirmButtonText: "知道了",
              callback: action => {
                this.enableSubmit();
                this.closeDetailDialog();
              }
            });
          },
          error: (err) => {
            let error = err.message || err;
            this.alertMessage = error;
            err.message && this.$alert(this.alertMessage, '', {
              type: "error",
              confirmButtonText: "知道了",
              callback: action => {
                this.enableSubmit();
              }
            });
          },
          complete: (res) => {
            this.$refs.dataTable.$emit('load-data');
          }
        });
      },
    },

  }
</script>
