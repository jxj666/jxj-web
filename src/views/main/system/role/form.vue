<template>
  <el-dialog :title='dialogInfo.dialogType =="add"?"新增":"编辑"'
             size="customer"
             class="dialog-container"
             :visible.sync="dialogVisible"
             :show-close="true"
             @close="closeDialog"
             :close-on-click-modal="false"
             center>
    <div class="dialog-form user-form">
      <el-form class="formInputWidth"
               ref="ruleForm"
               :rules="rules"
               :model="formData">

        <el-form-item label="登录名" prop="loginName" :label-width="formLabelWidth">
          <el-input v-model="formData.loginName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="formData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="formData.phone" type="number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="isAdd" label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-show="isAdd" label="确认密码" prop="rePassword" :label-width="formLabelWidth">
          <el-input v-model="formData.rePassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId" :label-width="formLabelWidth">
          <el-select v-model="formData.roleId" clearable filterable placeholder="请选择"
                     size="small">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

    </div>
    <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" size="small" @click="save">确 定</el-button>
          </span>
  </el-dialog>
</template>
<style scoped>

  .user-form {
    width: 420px;
  }

  .user-form .el-input {
    width: 200px;
  }

  .user-form .el-form-item__label {
    width: 80px;
  }

</style>

<script>
  export default{
    props: ['dialogInfo', 'dialogFormVisible', 'roleOptions'],
    components: {},
    data(){
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === this.formData.password) {
          callback();
        }
      };
      return {
        formData: {
          loginName: '',
          name: '',
          email: '',
          phone: '',
          password: '',
          rePassword: '',
          roleId: '',
          id: ''
        },
        ruleForm: {
          loginName: '',
          name: '',
          email: '',
          phone: '',
          password: '',
          rePassword: '',
          roleId: '',
          id: ''
        },
        rules: {
          loginName: [
            {required: true, message: '请输入登录名称', trigger: 'blur'},
            {max: 50, message: '长度最多24个字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            {max: 50, message: '长度最多24个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: "email", message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
//            {type: "number", message: '请输入正确的手机号', trigger: 'blur,change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          rePassword: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'},
            {validator: validatePass3, trigger: 'change'},
          ],
          roleId: [
            {required: true, message: '请选择用户角色', trigger: 'blur'}
          ],
        },
        formLabelWidth: '100px',
        dialogVisible: false,
        isAdd: true,
      }
    },
    computed: {},
    created(){

    },
    mounted(){

    },
    methods: {
      save(){
        if (!this.formData.loginName) {
          this.$message('请输入登录名称！');
          return false;
        } else {
          if (this.formData.loginName.length > 24) {
            this.$message('限制24个字符，包括标点符号');
            return false;
          }
        }

        if (!this.formData.name) {
          this.$message('请输入用户名！');
          return false;
        } else {
          if (this.formData.name.length > 24) {
            this.$message('限制24个字符，包括标点符号');
            return false;
          }
        }
        if (!this.formData.email) {
          this.$message('请输入邮箱！');
          return false;
        }

        if (!this.formData.phone) {
          this.$message('请输入手机号！');
          return false;
        }

        if (this.isAdd && !this.formData.password) {
          this.$message('请输入密码！');
          return false;
        }
        if (this.isAdd && !this.formData.rePassword) {
          this.$message('请输入确认密码！');
          return false;
        }

        if (!this.formData.roleId) {
          this.$message('请选择角色！');
          return false;
        }

        this.dialogInfo.disabled = true;
        this.$emit('submitForm', this.dialogInfo.dialogType, this.formData, this.dialogInfo.form.id);
      },
      resetForm(formName) {
        if (this.$refs[formName]) {
          this.$refs[formName].resetFields();

          this.formData.loginName = "";
          this.formData.name = "";
          this.formData.email = "";
          this.formData.phone = "";
          this.formData.password = "";
          this.formData.rePassword = "";
          this.formData.roleId = "";

        }
      },
      closeDialog(){
        this.$emit('closeDialog');
      },
    },
    watch: {
      dialogInfo: {
        handler: function (val, oldVal) {
          this.isAdd = val.dialogType == 'add' ? true : false;
          if (val.dialogType === 'add') {
            this.resetForm("ruleForm");
          } else {
            this.formData = val.form;
          }
        },
        deep: true
      },
      dialogFormVisible: function (val, oldVal) {
        this.dialogVisible = val;
      },
    }
  }
</script>
