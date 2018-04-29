<template>
  <el-dialog :title='dialogInfo.dialogType =="add"?"新增":"编辑"'
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
        <el-form-item label="姓名" prop="realName" :label-width="formLabelWidth">
          <el-input v-model="formData.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号"  :label-width="formLabelWidth">
          <el-input v-model="formData.employeeID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号密码"  :label-width="formLabelWidth">
          <el-input v-model="formData.employeePassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" :label-width="formLabelWidth">
          <el-input v-model="formData.mobile" type="number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="rePassword" :label-width="formLabelWidth">
          <el-input v-model="formData.rePassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色"  :label-width="formLabelWidth" prop="roleId">
          <el-select v-model="roleIds" multiple placeholder="请选择"
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
            <el-button @click="closeDialog">取 消</el-button>
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

  import ajax from "../../../../utils/ajax"
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
      	roleIds:[],
        formData: {
          loginName: '',
          realName: '',
          email: '',
          mobile: '',
          password: '',
          rePassword: '',
          roleId: [],
          userId: '',
          employeeID:'',
          employeePassword:'',
        },
        ruleForm: {
          loginName: '',
          realName: '',
          email: '',
          mobile: '',
          password: '',
          rePassword: '',
          roleId: [],
          userId: '',
          employeeID:'',
          employeePassword:'',
        },
        rules: {
          loginName: [
            {required: true, message: '请输入登录名称', trigger: 'blur'},
            {max: 50, message: '长度最多24个字符', trigger: 'blur'}
          ],
          realName: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            {max: 50, message: '长度最多24个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: "email", message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          // employeeID: [
          //   {required: true, message: '请输入工号', trigger: 'blur'},
          // ],
          // employeePassword: [
          //   {required: true, message: '请输入工号密码', trigger: 'blur'},
          // ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
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
        rolesList: [],
      }
    },
    computed: {
//    	roleIds:function () {
//        return this.formData.roleId;
//      }
    },
    created(){
    },
    mounted(){

    },
    methods: {
      isPhoneAvailable (phone) {
         var reg=/^[1][3,4,5,6,7,8][0-9]{9}$/;
         return reg.test(phone) || false;
      },
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

        if (!this.formData.realName) {
          this.$message('请输入用户名！');
          return false;
        } else {
          if (this.formData.realName.length > 24) {
            this.$message('限制24个字符，包括标点符号');
            return false;
          }
        }
        if (!this.formData.email) {
          this.$message('请输入邮箱！');
          return false;
        }
        // if (!this.formData.employeeID) {
        //   this.$message('请输入工号！');
        //   return false;
        // }
        // if (!this.formData.employeePassword) {
        //   this.$message('请输入工号密码！');
        //   return false;
        // }

        if (!this.formData.mobile) {
          this.$message('请输入手机号！');
          return false;
        }
        if (!this.isPhoneAvailable(this.formData.mobile)) {
          this.$message('手机号格式不正确');
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
        if(this.formData.password !== this.formData.rePassword){
          this.$message('两次输入密码不一致！');
          return false;
        }

        if (!this.formData.roleId) {
          this.$message('请选择角色！');
          return false;
        }

        this.dialogInfo.disabled = true;
        this.formData.roleId = this.roleIds;
        this.$emit('submitForm', this.dialogInfo.dialogType, this.formData, this.dialogInfo.form.userId);
      },
      resetForm(formName) {
        if (this.$refs[formName]) {
          this.$refs[formName].resetFields();

          this.formData.loginName = "";
          this.formData.realName = "";
          this.formData.email = "";
          this.formData.mobile = "";
          this.formData.employeeID = '';
          this.formData.employeePassword = '';
          this.formData.password = "";
          this.formData.rePassword = "";
          this.formData.roleId = [];
          this.formData.userId = "";

          this.roleIds = [];
        }
      },
      closeDialog(){
        if (this.dialogInfo.dialogType !== 'add') {
          this.$refs['ruleForm'].resetFields();
          this.formData = this.dialogInfo.form;
          this.roleIds = this.formData.roleId;
        }
        this.$emit('closeDialog');
      },
    },
    watch: {
      dialogInfo: {
        handler: function (val, oldVal) {
          console.log(val)
          this.isAdd = val.dialogType == 'add' ? true : false;
          if (val.dialogType === 'add') {
            this.resetForm("ruleForm");
//            this.rules.password = [
//              {required: true, message: '请输入密码', trigger: 'blur'},
//            ];
//            this.rules.rePassword = [
//              {required: true, message: '请输入确认密码', trigger: 'blur'},
//              {validator: validatePass2, trigger: 'blur'},
//              {validator: validatePass3, trigger: 'change'},
//            ];
          } else {
            this.formData = Object.assign({},val.form);
            this.roleIds = this.formData.roleId;
//            this.rules.password = [];
//            this.rules.rePassword = [];
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
