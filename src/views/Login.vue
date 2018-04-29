<template>
  <div class="login">
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="login-title">
               好分期人工信审系统
          </h1>
        </el-col>
      </el-row>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" size="small" auto-complete="off" :value="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" size="small" auto-complete="off" @keyup.enter.native="login()" :value="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="validateCode">
          <div class="w130 left">
            <el-input v-model="loginForm.validateCode" size="small" :maxlength="4" placeholder="请输入密码"></el-input>
          </div>
          <div class="left">
            <img :src="validateCodeUrl" ref="code" id="codeId" style="width: 80px; height: 27px; margin: 4px 10px 0;">
          </div>
          <div class="left">
            <el-button type="text" class="right" @click="getValidateCode">换一张</el-button>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login()">&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;</el-button>
          <el-button type="text" class="right" @click="dialogFormVisible = true">忘记密码</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="忘记密码"  :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="forgetPasswordForm" :rules="forgetPasswordFormRules" ref="forgetPasswordForm"
               label-width="80px">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="forgetPasswordForm.realName" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="forgetPasswordForm.email" auto-complete="off" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForgetPassword()" size="small">重置密码</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
   import ajax from '../utils/ajax'
   import auth from '../utils/authenticate'

  export default {
    data() {
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(common.regPassword(value) == false) {
          callback(new Error('输入的密码格式有误'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          realName: '',
          password: '',
          validateCode: '',
        },
        loginFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur' }
          ],
          password: [
            //{ validator: validatePassword, trigger: 'blur' },
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          validateCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        },
        dialogFormVisible: false,
        forgetPasswordForm: {
          email: '',
          realName: ''
        },
        forgetPasswordFormRules: {
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          realName: [
            { required: true, message: '请输入账号对应的姓名', trigger: 'blur' },
          ]
        },
        validateCodeUrl: ''
      }
    },
    mounted(){
      this.getValidateCode();
    },
    methods:{

      getValidateCode(){
        const that = this;

         ajax({
           url: "/validatePic/get",
           type: "get",
           dataType: 'json',
           success(res){
             that.validateCodeUrl = `data:image/png;base64,${res.data.imgData}`;
           },
           error(response){
             that.$notify({
               type:'error',
               title: '错误',
               message: response.message ||  "未知错误"
             });
           }
         });

      },

      login: function(){
        var _this = this;

        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            let params = this.loginForm;
            let router = this.$router;
             ajax({
               url: "/login",
               type: "post",
               data: params,
               contentType:'application/x-www-form-urlencoded;',
               isFormData: true,
               success(response){
                 let userData = response.data.perms || null;
                 auth.login(userData)
                 let toPath = router.currentRoute.query.redirect || '/admin/';
                 //console.log(router.currentRoute,'router.currentRoute')
                 router.push({path: toPath});
               },
               error(response){
                 _this.$notify({
                   type:'error',
                   title: '错误',
                   message: response.message ||  "未知错误"
                 });
               }
             });
          } else {
            return false;
          }
        });
      },
      submitForgetPassword() {
        this.$refs['forgetPasswordForm'].validate((valid) => {
          if (valid) {
            let params = this.forgetPasswordForm;
            let router = this.$router;
             ajax({
               url: "/sysUser/forgetPassword",
               type: "post",
               data: params,
               contentType:'application/x-www-form-urlencoded;',
               isFormData: true,
               success: (response) => {
                 this.dialogFormVisible = false;
                 let message = "密码已经重置,请到邮箱查收重置密码邮件";
                 this.$notify.success({
                   title: '重置成功',
                   message: message
                 });
               },
               error: (response) => {
                 this.$notify.error({
                   title: '错误',
                   message: response.message ||  "未知错误"
                 });
               }
             });
          } else {
            return false;
          }
        });
      }
    },
  }
</script>

<style scoped>
  body{
    font-family:"Microsoft YaHei";
    font-size: 12px;
  }
  /*.login{*/
    /*position: absolute;*/
    /*width: 99%;*/
    /*height: 98%;*/
    /*font-size: 12px;*/
    /*!*background: url('../assets/images/bg.png') 0 0 repeat;*!*/
  /*}*/
  .container{
    box-sizing: border-box;
    width:460px;
    height: 360px;
    padding: 20px 40px;
    margin-left: -230px;
    margin-top: -200px;
    position: absolute;
    left: 50%;
    top: 50%;
    border:1px solid #e8ebf2;
    border-radius:2px;
    filter:progid:DXImageTransform.Microsoft.Shadow(color='#e8ebf2', Direction=135,Strength=5);/*for ie6,7,8*/
    background-color: #fff;
    -moz-box-shadow:0 2px 16px #e8ebf2, 0 0 1px #e8ebf2, 0 0 1px #e8ebf2;/*firefox*/
    -webkit-box-shadow:0 2px 16px #e8ebf2, 0 0 1px #e8ebf2, 0 0 1px #e8ebf2;/*webkit*/
    box-shadow:0 2px 16px #e8ebf2, 0 0 1px #e8ebf2, 0 0 1px #e8ebf2;/*opera或ie9*/
  }
  .login-title{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #1a1d22;
    line-height: 50px;
  }
  .right {
    float: right;
  }
  .w130 { width: 130px;}
  .left { float: left; }
</style>
