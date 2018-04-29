<template>
  <div class="call-center">
    <h2 style="text-align:center;">CallThink 呼叫中心连接</h2>
    <div style="margin: 0 auto; max-width: 1150px;">
      <el-alert
        title="在操作期间请保留此页面，不要关闭！"
        type="warning"
        description="为了保证可以顺利通话，首次通话需要先打开此页面，连接呼叫中心和坐席，在操作期间请保留此页面，不要关闭！
  如果不小心关闭了此页面，或者连接失败，无法拨出电话，请点击“连接呼叫中心”按钮打开此页面, 重新连接"
        show-icon>
      </el-alert>
    </div>
    <br>
    <br>
    <el-form :inline="true" :model="ctiForm" style="text-align: center;">
      <el-form-item label="分机号">
        <el-input v-model="loginExt" placeholder="分机号" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item label="工号" >
        <el-input v-model="loginUid" placeholder="分机号" style="width:100px" @input="setLoginUid"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginPwd" placeholder="密码" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="connectCTI">① 连接CTI服务器</el-button>
        <el-button type="primary" @click="clientLogin">② 座席登入</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="disConnectCTI">断开CTI服务器</el-button>
        <el-button type="default" @click="clientLogout">座席登出</el-button>
        <el-button type="default" @click="clearCtiMessage">清空日志</el-button>
      </el-form-item>
      <!--<el-form-item>-->
      <!--<el-button @click="dialogVisible=true">坐席状态信息</el-button>-->
      <!--</el-form-item>-->
    </el-form>

    <div style="margin: 0 auto; max-width: 1150px;">
      <h2 style="text-align:center;">登录日志</h2>
      <el-input v-model="statusMessage" type="textarea" autosize></el-input>
      <el-input v-model="ctiMessage" type="textarea" autosize style="margin-top:10px;"></el-input>
    </div>


    <el-dialog
      title="坐席状态信息"
      :visible.sync="dialogVisible">
      <el-form ref="statusForm" label-width="150px">
        <el-form-item label="连接状态信息:">
          <span class="mute" v-text="statusMessage || '--'"></span>
        </el-form-item>
        <el-form-item label="坐席状态信息:">
          <span class="mute" v-text="ctiMessage || '--'"></span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <br>

  </div>
</template>
<style>
</style>
<script>
  export default{
    data(){
      return {
        dialogVisible: false,
        nRetry_times: 0,
        isConnect_CTI: 0,
        ctiMessage: '',
        statusMessage: '',
        ctiForm: {
          ctiProxyAddr: 'http://10.10.27.232',
        },
        loginUid: '',
        loginPwd: '1234',
        loginExt: '',
        groupCallparams: {
          hotLine:'59566483',
          cno:'2000',
          pwd:'9vqvlrkv',
          bindTel:'01043919031',
          bindType:'1',
          initStatus:'online',
        },
        phoneTypes: [
          {label: '固话/手机', value: '1'},
          {label: '分机号', value: '2'},
          {label: '软电话', value: '3'}
        ],
        initStates: [{label: '空闲', value: 'online'}, {label: '置忙', value: 'pause'}],
        outPhoneTypes: [{label: '不退出座席，只退出电话', value: ''}, {label: '同时退出电话及座席', value: ''}],
        unBindPhones: [{label: '解除', value: ''}, {label: '不解除', value: ''}]
      }
    },
    created() {
      this.loginUid  = localStorage.getItem('employeeID') || '';
      localStorage.setItem('loginUid', this.loginUid);
      this.loginPwd = localStorage.getItem('employeePassword') || '';
      window.messageBus.$on('status-change', (message) => {
        this.ctiMessage = message;
      })
    },
    methods: {
      setLoginUid  () {
          localStorage.setItem('loginUid', this.loginUid);
      },
      //群呼座机登陆
      groupCallLogin() {
        //console.log(document.getElementById("toolbar").contentWindow.executeAction);
        let _this = this;
        document.getElementById("toolbar").contentWindow.executeAction('doLogin',  _this.groupCallparams);
        localStorage['cno'] = _this.groupCallparams.cno;
      },

      // 群呼座机登出
      groupCallLogout() {
        let params = {};
        params.type = 1 ;
        document.getElementById("toolbar").contentWindow.executeAction('doLogout', params);
      },

      // 连接CTI
      connectCTI()  {
        console.log(this.groupCallparams);
        if (!this.loginExt) {
          this.$notify.error({
            message: '请填写分机号'
          });
          return;
        }
        localStorage.setItem('ermasPlugin_ext', this.loginExt); // 设置分机号
        //注意：应用程序 需要将strIP 赋给 ATClient_proxy.ashx 中的变量 strCTI_url = strIP;
        //      本demo 因为未用后台代码，需要手工改写。
        var ctiAddr = ATGetCTIInfo("IPADDR", "", 0);
        console.log(ctiAddr)
        // const ctiAddr = "10.10.27.232:18000";
        const strRet = ATConnect(ctiAddr);
        console.log(strRet, 'strRet');
        setTimeout(this.getConnectResult, 100);  //异步函数,延时100s,再取结果
      },
      // 断开CTI
      disConnectCTI(){
        var strRet = ATDisconnect();
        if (strRet == "OK") {
          this.statusMessage = "断开CTI服务器成功"
          this.$notify.success({
            message: '断开CTI服务器成功'
          });
        }
        return false;
      },
      // 获取连接结果
      getConnectResult() {
        var strRet = ATCommandResult();
        if (strRet == "OK") {
          this.statusMessage = "连接CTI服务器成功"
          this.$notify.success({
            message: '连接CTI服务器成功'
          });
        }
        else {
          this.$notify.error({
            message: '与UltraCTI连接失败，请检查，原因：  1.网络连接是否正常.  2.UltraCTI工作是否正常.'
          });
        }
      },
      // 登录坐席
      clientLogin() {
        var validity = false;
        if (this.loginPwd == "") this.loginPwd = "";
        if (!this.loginUid) {
          this.$notify.error({
            message: '工号不正确！'
          });
          return validity;
        }
        if (!this.loginExt) {
          this.$notify.error({
            message: '座席号码不正确！'
          });
          return validity;
        }

        console.log('登录坐席');
        console.log(this.loginUid);
        var strLoginGroup = "0";
        var strLoginInfo = "COMPRESS=0;REG_GROUP=ALL;NOT_READY=0;";
        //var strLoginInfo = "PROTOCOL=1;COMPRESS=0;REG_GROUP=0;NOT_READY=0;";
        // COMPRESS=0，1-采用压缩传输数据，0-不压缩。
        // REG_GROUP=ALL，0，G1|G2|G3；  注册ACD组的消息，包括：座席、分机、中继、队列等。
        //        G1|G2|G3-表示监控指定组。
        //        ALL-监控所有消息
        //        0或空-和本座席相关的消息
        // NOT_READY=1，1-登入后不能接听电话，需要签入ATSetReady(uid,1),签出ATSetReady(uid,0)   0-登入后可以接听电话，不要要签入ATSetReady()
        var strRet = ATLogin_ex(this.loginUid, this.loginPwd, this.loginExt, strLoginGroup, strLoginInfo);
        setTimeout(this.getLoginResult, 500);  //异步函数,延时100s,再取结果
        this.nRetry_times = 0;
      },
      // 坐席登出
      clientLogout() {
        var validity = true;
        console.log('isConnect_CTI:' + this.isConnect_CTI)
        if (this.isConnect_CTI > 0) {
          var Result = ATLogout_ex(this.loginUid);
          this.isConnect_CTI = 0;
          this.statusMessage = "座席成功退出";
          this.$notify.success({
            message: '座席成功退出'
          });
        } else {
          this.$notify.error({
            message: '座席未登入'
          });
        }
        return validity;
      },
      // 获取坐席登录结果
      getLoginResult() {
        console.log('获取登录坐席结果...')
        var validity = false;
        var strRet = ATCommandResult();
        console.log(strRet, ' strRet')
        if (strRet == "") {
          this.nRetry_times += 1;
          console.log('检查登录状态: ' + this.nRetry_times);
          if (this.nRetry_times < 20) {
            setTimeout(this.getLoginResult(), 500);
            return;
          }
        }

        if (strRet == "OK") {
          validity = true;
          this.isConnect_CTI = 1;
          this.statusMessage = "坐席登录成功";
          this.$notify.success({
            message: '坐席登录成功'
          });
        }
        else {
          let message = '';
          if (strRet == "ERROR_UID") {
            message = 'Local:登录失败，请检查工号是否正确！'
          }
          else if (strRet == "ERROR_PWD") {
            message = 'Local:登录失败，请检查密码是否正确！'
          }
          else if (strRet == "ERROR_REP") {
            message = 'Local:对不起，该帐号正在使用！'
          }
          else if (strRet == "FAIL") {
            message = 'Local:登录失败，请检查工号或密码是否正确！'
          }
          else {
            message = 'Local:登录失败(' + strRet + ')，请检查 CTI Server 是否运行正常！'
          }
          this.$notify.error({
            message: message
          });
        }
        return validity;
      },
      clearCtiMessage() {
        this.ctiMessage = '';
        this.statusMessage = '';
      }
    }
  }
</script>

<style global>
  .call-center .el-textarea textarea {
    font-size: 12px;
  }

  .call-center .el-alert--info {
    max-width: 1150px;
    margin: 0 auto;
  }

  .call-center .el-alert__title {
    display: block;
    font-size: 14px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .mute {
    color: #999;
    font-size: 12px;
  }
</style>
