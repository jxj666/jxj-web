<template>
  <div class="page">
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h2 class="page-title">
            {{title}}
          </h2>
        </el-col>
      </el-row>
      <el-form :model="passwordForm" :rules="passwordFormRules" ref="passwordForm" :label-position="labelPosition" label-width="100px">

        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="passwordForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkNewPassWord">
          <el-input type="password" v-model="passwordForm.checkNewPassWord" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit()">提交</el-button>
          <el-button @click="resetPasswordForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import ajax from '../../../utils/ajax'
  import auth from '../../../utils/authenticate'
  import {Notification} from 'element-ui';
  export default {
    data() {
      /**
       *
       * @param rule
       * @param value
       * @param callback
       */
      var validatePassword = (rule, value, callback) => {
        if (value !== '') {
          if (this.passwordForm.checkNewPassWord !== '') {
            //Common.ajax
          }
          callback();
        }
      };
      var validateNewPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
//          var reg = /^[0-9a-zA-Z]+$/;
//          var regu = /\w*[0-9]+\w*$/;
//          var regu2 = /\w*[a-zA-Z]+\w*$/;
//          if (value.length < 7 || !regu.test(value) || !regu2.test(value)) {
//            callback(new Error('密码须为大于6位的数字和字母'));
          if(value.length<8 || value.length>16){
            callback(new Error('密码8-16位'))
          }
          else if(!/^(?=.*((?=[!@#$%^&*_]+)[^A-Za-z0-9]))(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[^\u4e00-\u9fa5]{8,16}$/.test(value)){
            callback(new Error('大小写字母、数字、特殊字符@#$%^&*_'))
          } else {
            if (this.passwordForm.checkNewPassWord !== '') {
              this.$refs.passwordForm.validateField('checkNewPassWord');
            }
            callback();
          }
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === this.passwordForm.newPassword) {
          callback();
        }
      };

      return {
        title: '修改密码',
        labelPosition:'right',
        passwordForm: {
          password: '',
          newPassword: '',
          checkNewPassWord: '',
        },
        passwordFormRules: {
//          username: [
//            { required: true, message: '请输入用户名', trigger: 'blur' },
//            //{ min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
//          ],
          password: [
            {required: true, message: '请输入原密码', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'},
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
//            {min: 7, message: '大于6位的数字和字母', trigger: 'blur'},
            {validator: validateNewPassword, trigger: 'blur'},
          ],
          checkNewPassWord: [
            {required: true, message: '请确认新密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'},
            {validator: validatePass3, trigger: 'change'},
          ],
        }
      }
    },
    mounted(){
    },
    methods: {
      submit: function () {
        this.$refs['passwordForm'].validate((valid) => {
          if (valid) {
            var params = this.passwordForm;
            var router = this.$router;
            ajax({
              url: "/sysUser/updatePassword",
              type: "POST",
              params: params,
              timeout: 1000,
              success: function (response) {
                var res = response.data || response;
                if (res) {
                  auth.setRequiresAlterPassword(false);
                  Notification.success({
                    title: '修改',
                    message: response.message || '成功'
                  });
                  router.push({path: '/admin'})
                }
                else {
                  Notification.error({
                    title: '错误',
                    message: response.message || response.status || '登录失败'
                  });
                }
              },
              error: function (response) {
                var message = (response.message) ? response.message : "未知错误";
                Notification.error({
                  title: '错误',
                  message: message
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      clearPassword: function () {
        this.passwd = "";
      },
      resetPasswordForm() {
        this.$refs['passwordForm'].resetFields();
      }
    },
  }

</script>

<style scoped>
  body {
    font-family: "Microsoft YaHei";
    font-size: 12px;
  }

  .page {
    position: absolute;
    width: 99%;
    height: 98%;
    font-size: 12px;
    background: url('../../../assets/images/bg.png') 0 0 repeat;
  }

  .container {
    box-sizing: border-box;
    width: 400px;
    /*height: 300px;*/
    padding: 20px 60px 20px 10px;
    margin-left: -360px;
    margin-top: -180px;
    position: absolute;
    left: 50%;
    top: 50%;
    border: 1px solid #e8ebf2;
    border-radius: 2px;
    filter: progid:DXImageTransform.Microsoft.Shadow(color='#e8ebf2', Direction=135, Strength=5); /*for ie6,7,8*/
    background-color: #fff;
    -moz-box-shadow: 0 2px 16px #e8ebf2, 0 0 1px #e8ebf2, 0 0 1px #e8ebf2; /*firefox*/
    -webkit-box-shadow: 0 2px 16px #e8ebf2, 0 0 1px #e8ebf2, 0 0 1px #e8ebf2; /*webkit*/
    box-shadow: 0 2px 16px #e8ebf2, 0 0 1px #e8ebf2, 0 0 1px #e8ebf2; /*opera或ie9*/
  }

  .page-title {
    text-align: center;
    padding-left: 60px;
    font-size: 20px;
    font-weight: bold;
    color: #1a1d22;
    line-height: 50px;
  }


</style>
