<template>
  <tab-page ref="tabPage">
    <template slot="roleListTabPage">
      <div class="container-box">
        <el-row class="mt-20">
          <el-col :span="12">
            <el-form :inline="true" :model="queryParams">
              <el-form-item>
                <div style="display: inline-block; vertical-align: middle;">角色名称</div>
              </el-form-item>

              <el-form-item>
                <el-input
                  size="small"
                  placeholder="请输入"
                  v-model="queryParams.roleName"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchRoleList" size="small">查询
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8" class="right">
            <el-button type="primary" class="right" @click="handleCreate" size="small">新建角色
            </el-button>
          </el-col>
        </el-row>

        <el-table :data="roleList" border style="width: 100%">
          <el-table-column type="index"
                           align="center"
                           width="100"
                           label="序号">
          </el-table-column>
          <el-table-column prop="name"
                           label="角色名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="createTime"
                           align="center"
                           :formatter="formatterCreateTime"
                           label="创建时间">
          </el-table-column>

          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.row, scope.column)">
                编辑
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.row, scope.column)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :title="roleFormTitle" :visible.sync="dialogFormVisible" size="large">
          <el-row>
            <el-col :span="8">
              <el-form class="role-form"
                       :model="roleForm" :rules="roleFormRules" ref="roleForm" label-width="100px">
                <el-form-item label="角色名" prop="name">
                  <el-input v-model="roleForm.name" auto-complete="off" size="small"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="16" class="pdl-20">
              <div>资源权限</div>
              <el-tree
                :data="resourceTree"
                :props="defaultProps"
                :check-strictly="true"
                node-key="id"
                show-checkbox
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderResourceContent"
                ref="resourceTree">
              </el-tree>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" size="small" @click="saveRole()">确 定</el-button>
          </div>
        </el-dialog>
      </div>

    </template>
  </tab-page>
</template>

<script>
  import TabPage from "@/components/TabPage"
  import ajax from '@/utils/ajax'
  import dateFormat from '@/utils/dateFormat'
  import _ from 'lodash'
  export default {
    components: {
      TabPage,
    },
    data () {
      return {
        queryParams: {
          roleName: '',
        },
        roleForm: {
          name: '',
          permissionIds: []
        },
        roleFormRules: {
          name: [
            {required: true, message: '请输入角色名', trigger: 'blur'},
            {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur'}
          ],
        },
        roleFormTitle: '新建角色',
        roleList: [],
        // 资源列表
        resourceTree: [],
        // tree 组件用到
        defaultProps: {
          children: 'childPerms',
          label: 'name'
        },
        dialogFormVisible: false
      }
    },
    created () {
      this.searchRoleList()
      this.searchResourceTree()
    },
    mounted(){
      var defaultPage = {
        label: "角色管理",
        name: "default",
        slotName: 'roleListTabPage',
        closable: false
      };
      this.$refs.tabPage.$emit("open-tab", defaultPage);
    },
    methods: {
      searchRoleList () {
        ajax({
          url: '/sysRole/getRoleList',
          method: 'post',
          data: this.queryParams,
          contentType:'application/x-www-form-urlencoded;',
          isFormData: true,
          success: (response) => {
            let data = response.data || []
            this.roleList = data

          },
          error: (response) => {
            let message = (response.message) ? response.message : '未知错误'
            this.$notify.error({
              title: '错误',
              message: message
            })
          }
        })
      },
      searchResourceTree () {
        let params = {}
        ajax({
          url: '/sysPermission/getPermissionTree',
          method: 'post',
          data: params,
          success: (response) => {
            let data = response.data || null;

            if (data.permTree && data.permTree.length) {
              console.log('tree:', data.permTree);
              this.resourceTree = data.permTree
            } else {
              this.resourceTree = []
            }

          },
          error: (response) => {
            let message = (response.message) ? response.message : '未知错误'
            this.$notify.error({
              title: '错误',
              message: message
            })
          }
        })
      },
      renderResourceContent (h, {node, data, store}) {
        let selectButton = '';
        console.log(data);
        if (data.childPerms && data.childPerms.length > 0) {
          selectButton = <span>
            <el-button
            type = "primary"
            size = "mini"
            on-click = {()=>this.selectAll(node, data)}>
            全部反选
          </el-button>
          </span>
        }
        return (
          <div style = "display:flex;flex:1;justify-content:space-between;align-items: center;font-size:14px;padding-right: 8px;" class = "custom-tree-node">
          <span> {node.label}</span>
          {selectButton}
        </div>)
      },
      formatterCreateTime(row, column){
        return dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss');
      },
      handleCreate () {
        this.roleFormTitle = '新建角色'
        if (this.roleForm.roleId) {
          this.roleForm = {
            name: '',
            permissionIds: []
          }
        }
        this.dialogFormVisible = true;
        console.log(this.$refs);
//        this.$refs.resourceTree.setCheckedKeys([])
      },
      handleEdit (row) {
        this.roleFormTitle = '编辑角色'
        this.roleForm = {
          name: row.name,
          permissionIds: row.permissionIds,
          roleId: row.id
        };
        ajax({
          url: '/sysPermission/getPermissionByRole',
          method: 'post',
          data: {
            roleId: row.id
          },
          isFormData: true,
          contentType: 'application/x-www-form-urlencoded;',
          success: (response) => {
            this.dialogFormVisible = true;
            let data = response.data || null
            if (data.perms && data.perms.length) {
              this.roleForm.permissionIds = data.perms;

            } else {
              this.roleForm.permissionIds = []
            }
            this.$nextTick(() => this.$refs.resourceTree.setCheckedKeys(this.roleForm.permissionIds))

          },
          error: (response) => {
            let message = (response.message) ? response.message : '未知错误'
            this.$notify.error({
              title: '错误',
              message: message
            })
          }
        });
      },
      handleDelete (row) {
        this.$confirm('确定删除该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax({
            url: '/sysRole/delete',
            method: 'post',
            data: {
              roleId: row.id
            },
            isFormData: true,
            contentType: 'application/x-www-form-urlencoded;',
            success: (response) => {
              this.dialogFormVisible = false
              this.searchRoleList()
              this.$notify.success({
                title: '成功',
                message: '操作成功了'
              })
            },
            error: (response) => {
              let message = (response.message) ? response.message : '未知错误'
              this.$notify.error({
                title: '错误',
                message: message
              })
            }
          })
        }).catch(() => {
        })
      },
      selectAll (node, data) {
        function getTreeIdList(tree, idList) {
          if (!tree) return
          if (tree.childPerms) {
            for (let item of tree.childPerms) {
              getTreeIdList(item, idList)
            }
          }
          idList.push(tree.id)
        }

        let idList = []
        let checkedIdList = this.$refs.resourceTree.getCheckedKeys()
        getTreeIdList(data, idList)
        idList = _.xor(idList, checkedIdList);

        this.$refs.resourceTree.setCheckedKeys(idList)
      },
      saveRole () {
        this.$refs['roleForm'].validate((valid) => {
          if (valid) {
            // 新建 或 更改 角色信息
            console.log('ids:',this.$refs.resourceTree.getCheckedKeys());
            this.roleForm.permissionIds = this.$refs.resourceTree.getCheckedKeys()
//            this.roleForm.permissionIds = (this.$refs.resourceTree.getCheckedKeys()).join(',')
            const url = (this.roleForm.roleId) ? '/sysRole/update' : '/sysRole/add'
            ajax({
              url: url,
              method: 'post',
              data: this.roleForm,
//              isFormData: true,
//              contentType: 'application/x-www-form-urlencoded;',
              success: (response) => {
                this.dialogFormVisible = false
                // reload table list
                this.searchRoleList()
                this.$notify.success({
                  title: '成功',
                  message: '操作成功了'
                })
              },
              error: (response) => {
                let message = (response.message) ? response.message : '未知错误'
                this.$notify.error({
                  title: '错误',
                  message: message
                })
              }
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped="">
  .container-box {
    padding: 0 10px;
    height: 100%;
    background-color: #fff;
    min-height: 500px;
    overflow-y: auto;
    padding-bottom: 50px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .pdl-20 {
    padding-left: 20px;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .role-form.el-form {
    width: 200px;
  }

  .role-form.el-form .el-select {
    width: 100%;
  }

  .el-tree {
    cursor: default;
    background: #fff;
    border: 1px solid #d1dbe5;
  }

  .el-tree-node {
    display: block;
  }

  .el-tree-node__content {
    display: flex;
    line-height: 36px;
    height: 36px;
    cursor: pointer;
  }

  .el-tree-node__content .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
