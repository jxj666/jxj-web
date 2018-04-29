<template>
  <tab-page ref="tabPage">
    <template slot="userListTabPage">
      <data-table :data-table="dataTable" ref="dataTable">
        <div slot="conditions">
          <el-form :inline="true" :model="queryParams">
            <el-form-item>
              <div style="display: inline-block; vertical-align: middle;">角色名称</div>
            </el-form-item>

            <el-form-item>
              <el-input
                size="small"
                placeholder="请输入"
                v-model="queryParams.content"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch" size="small">查询
              </el-button>
            </el-form-item>

            <el-form-item class="right">
              <el-button type="primary" @click="add" size="small">新建角色
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <template slot="columns">
          <el-table-column prop="id"
                           align="center"
                           width="80"
                           label="序号">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width="120"
                           align="center">
          </el-table-column>
          <el-table-column prop="createDate"
                           align="center"
                           width="100"
                           label="创建时间">
          </el-table-column>

          <el-table-column
            align="center"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="edit(scope.row, scope.column)">
                编辑
              </el-button>
              <el-button type="danger" size="small" @click="remove(scope.row, scope.column)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </template>
      </data-table>
      <content-form
        :dialogInfo="dialogInfos"
        :dialogFormVisible="dialogVisible"
        :roleOptions="roleOptions"
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
        roleOptions: [
          {
            value: 'iOS',
            label: 'iOS'
          },
          {
            value: 'Android',
            label: 'Android'
          }
        ],
        queryParams: {
          content: ''
        },
        dataTable: {
          pageSize: 1000,
          pageSizes: [10, 20, 50, 100, 1000],
          url: "/v1/userList",
          type: 'get',
          restful: true,
          emptyText: '没有记录',
        },
        dialogInfos: {
          dialogType: 'add',
          form: {
            id: null,
            name: null,
            email: null,
            phone: null,
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
        const itemsMap = {
          0: 'primary',
          1: 'danger',
        };
        return itemsMap[item]
      },
    },
    created(){
//      this.getTypes();
    },
    mounted(){
      var defaultPage = {
        label: "用户管理",
        name: "default",
        slotName: 'userListTabPage',
        closable: false
      };
      this.$refs.tabPage.$emit("open-tab", defaultPage);
      this.getTypes();
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
            name: null,
            email: null,
            phone: null,
            status: null,
            roleId: null,
          },
          disabled: false
        };
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
        if (!this.queryParams.content) {
          this.$notify({
            title: '警告',
            message: '请输入查询内容',
            type: 'warning'
          });
          return false;
        }
        this.dataTable.url = '/user/search';
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
        this.dialogId = row.id;
        this.showDetailDialog();
      },
      remove: function (row, column) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax({
            url: '/api/v1/' + row.id,
            type: 'delete',
            contentType: 'application/json',
            data: JSON.stringify(this.formData),
            dataType: 'json',
            success: (res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
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
        var id = args[2];
        var optionType = 'post';
        var optionUrl = '/api/v1/';
        var successText = '新建成功';
        if (requestType === 'edit') {
          optionType = 'put';
          optionUrl = optionUrl + '/' + id;
          successText = '更新成功';
        }
        ajax({
          url: optionUrl,
          type: optionType,
          contentType: 'application/json',
          data: formData,
          dataType: 'json',
          success: (res) => {
            this.$alert(successText, '', {
              type: "success",
              confirmButtonText: "知道了",
              callback: action => {
                this.enableSubmit();
                this.closeDetailDialog();
                //this.$refs.history && this.$refs.history.$emit('load-data');
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
          complete: () => {
            this.$refs.dataTable.$emit('load-data');
            //this.$refs.history && this.$refs.history.$emit('load-data');
          }
        });

      },
    },

  }
</script>
