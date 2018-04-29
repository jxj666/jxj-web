// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import auth from './utils/authenticate'
// import filter from './utils/filter'

// 添加mockjs拦截请求，模拟返回服务器数据
// import mockTest from './mock/mockTest'

import './assets/style/font-awesome.min.css'
Vue.use(ElementUI)
Vue.config.productionTip = false


// 呼叫中心用到的全局消息通信中介
window.messageBus = new Vue()
// **********************
// 呼叫中心依赖的全局回调函数
// **********************
function get_call_status(strStatus) {
  var lbl_name;
  switch (strStatus) {
    case "01": //空闲
      lbl_name = "空闲";
      break;
    case "02": //应答
      lbl_name = "摘机";
      break;
    case "03": //振铃
      lbl_name = "振铃";
      break;
    case "04": //回铃
      lbl_name = "回铃";
      break;
    case "05": // 连接
      lbl_name = "通话";
      break;
    case "06": //断开
      lbl_name = "断开";
      break;
    case "07": //摘机
      lbl_name = "占用";
      break;
    case "08": //转移
      lbl_name = "转移";
      break;
    default: //未知
      lbl_name = "未知";
      break;
  }
  return lbl_name;
}

function getLoginUid() {
  try {
    const params = JSON.parse(sessionStorage.getItem('urlParams'));
    if( !params || !params.collector) {
      return null;
    }
    console.log('params.collector:'+params.collector);
    return params.collector;
  } catch (e) {
    console.log(e)
  }
  // return '10017892'
}

//表示外线状态发生变化，显示相应状态
function show_trunk_status(strTrunk, strStatus) {
  const loginUid = getLoginUid();
  if(!loginUid) {
    return;
  }
  var caller_code, ext_code, nDirection;
  var myCallInfo = ATGetCallInfo(loginUid, strTrunk, "", 2);

  //只接收本坐席 并且 本坐席非被叫(被叫时m_called为分机号, 分机号一般<6位)
  if(myCallInfo.m_uid !== loginUid || (myCallInfo.m_called && myCallInfo.m_called.length < 6)) {
    return
  }

  console.log('show_trunk_status: m_callid:' + myCallInfo.m_callid)
  strStatus = myCallInfo.m_status;
  var lbl_name = get_call_status(strStatus);
  caller_code = myCallInfo.m_caller;
  ext_code = myCallInfo.m_called;
  nDirection = myCallInfo.m_direction;
  console.log("外线状态：" + lbl_name + "，主叫：" + caller_code + "，被叫：" + ext_code + "，方向：" + nDirection + "，isCHQ：" + myCallInfo.is_conf + myCallInfo.is_hold + myCallInfo.is_queue); // + "，时长：" + document.ut_atocx.TrunkTimer);
  const message = "外线状态：" + lbl_name + "，主叫：" + caller_code + "，被叫：" + ext_code + "，方向：" + nDirection;
  window.messageBus.$emit('status-change', message);
  // window.messageBus.$emit('call-info', myCallInfo);
  //myCallInfo格式:  {"m_callid":"2017726185600594","m_caller":"8001","m_called":"13466375130","m_direction":2,"m_status":"04","m_stime":"18:55:54","m_ext":"8001","m_trunk":"39","m_trunkcalled":"","m_userinfo":"","m_uid":"10017892","m_timer":"","is_hold":"","is_conf":"","is_queue":""}
}

//表示分机状态发生变化，显示相应状态
function show_ext_status(strExt, strStatus) {
  const loginUid = getLoginUid();
  if(!loginUid) {
    return;
  }
  var myCallInfo = ATGetCallInfo(loginUid, strExt, "", 1);

  // 只接收本坐席 并且 本坐席非被叫(被叫时m_called为分机号, 分机号一般<6位)
  if(myCallInfo.m_uid !== loginUid || (myCallInfo.m_called && myCallInfo.m_called.length < 6)) {
    return
  }

  var strUid = myCallInfo.m_uid;  //ut_atocx.Ext_Uid;
  console.log(JSON.stringify(myCallInfo))
  // 不处理登录座席
  if (strUid != "") return;
  strStatus = myCallInfo.m_status;
  var lbl_name = get_call_status(strStatus);
  const message = "分机状态：" + lbl_name + "，分机：" + strExt;
  window.messageBus.$emit('status-change', message);
  // window.messageBus.$emit('call-info', myCallInfo);
  //myCallInfo格式:  {"m_callid":"2017726185600594","m_caller":"8001","m_called":"13466375130","m_direction":2,"m_status":"04","m_stime":"18:55:54","m_ext":"8001","m_trunk":"39","m_trunkcalled":"","m_userinfo":"","m_uid":"10017892","m_timer":"","is_hold":"","is_conf":"","is_queue":""}
}

window.onReceivePopupInfo = function(EventCode, EventData,EventInfo) {
  myATClient_onReceiveCTI_EventChanged(EventCode, EventData);
}

window.myATClient_onReceiveCTI_EventChanged = function(EventCode, EventData) {

  // 2017-09-04 jnoodle
  // 暂时不需要状态信息，把后面的日志记录和事件推送先屏蔽掉
  return;

  ///-----

  var strDisp;
  var strStatus;
  switch (EventCode) {
    case 0: //显示信息
      break;
    case 1: //1：表示座席员状态发生变化，EventData 表示座席员工号
      strStatus = "";
      show_agent_status(EventData, strStatus);
      break;
    case 2: //表示座席员呼叫状态发生变化，EventData 表示座席员工号
      show_agent_status(EventData, strStatus);
      break;
    case 3: //3：表示外线状态发生变化，EventData 表示外线号码
      strStatus = "";
      show_trunk_status(EventData, strStatus);
      break;
    case 4: //4：表示分机状态发生变化，EventData 表示分机号
      strStatus = "";
      show_ext_status(EventData, strStatus);
      break;
    case 5: //5：表示其它座席传来消息，EventData 表示消息内容
      console.log("其它座席传来消息:" + EventData);
      break;
    case 6: //6：表示有用户呼入信息：应用程序依靠此消息弹出用户资料，EventData 表示分机号
      console.log("有用户呼入信息");
      break;
    case 7: //7：表示有OEM呼入信息，可能是FAX、VMS、EMAIL、SMS、CHAT等
      console.log("有OEM呼入信息");
      break;
    case 10: //10：表示呼叫进入排队，EventData 表示呼叫标识
      console.log("呼叫进入排队" + EventData);
      break;
    case 11: //11：表示呼叫结束排队，EventData 表示呼叫标识
      console.log("呼叫结束排队" + EventData);
      break;
    case 100: //100：表示与服务器的连接中断
      strDisp = "本座席与 CTI Server 的连接断开，请重新登录！ErrCode=" + EventData;
      console.log(strDisp);
      window.messageBus.$emit('status-change', '本座席与呼叫中心的链路已断开')
      break;
    default:
      console.log('EventCode: '+EventCode+'未处理.');
      break;
  }
}

//表示座席员状态发生变化，显示相应状态
window.show_agent_status = function(strUid, strStatus) {
  const loginUid = getLoginUid();
  if(!loginUid) {
    return;
  }

  var myUidInfo = ATGetUidInfo(strUid);
  if(myUidInfo.m_uid !== loginUid) {
    return
  }
  var user_uid = myUidInfo.m_uid;
  var user_ext = myUidInfo.m_ext;
  var user_name = myUidInfo.m_name;
  strStatus = myUidInfo.m_call_status;

  if (user_name == "") user_name = user_uid;
  if (user_name == "") user_name = user_ext;
  if (user_ext == "") user_ext = user_uid;

  var lbl_name = get_call_status(strStatus);

  //01：可工作 02：置忙 03：事后处理 04：离席
  var UidStatus = myUidInfo.m_status;
  if (UidStatus == "00") return; // 坐席状态注销略过
  if (UidStatus == "01") UidStatus = "可工作";
  else if (UidStatus == "02") UidStatus = "置忙";
  else if (UidStatus == "03") UidStatus = "事后处理";
  else if (UidStatus == "04") UidStatus = "离席";
  else if (UidStatus == "06") UidStatus = "未准备好";
  else if (UidStatus == "00") UidStatus = "注销";
  console.log("座席状态：" + UidStatus + "，姓名：" + user_name + "，分机：" + user_ext + "，呼叫状态：" + lbl_name + "，isCHQ：" + myUidInfo.is_conf + myUidInfo.is_hold + myUidInfo.is_queue);
  const message = "座席状态：" + UidStatus + "，分机：" + user_ext + "，呼叫状态：" + lbl_name;
  window.messageBus.$emit('status-change', message)
}


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }else if(to.meta.permission && !auth.hasPermission(to.meta.permission)){
      next({
        path: '/admin/404'
      });
    }else {
      next();
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
