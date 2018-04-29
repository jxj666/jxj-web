<template>
  <div class="">
    <el-row>
      <el-col :span="12">
        <el-button type="primary" size="small" @click="openTelephoneInfo">手机号信息</el-button>
      </el-col>
      <el-col :span="12">
        <div class="" v-if="type" style="float:right">
          <el-button :class={btn_unable:handUpObj.handUp} :type="handUpObj.handUp?'danger':'primary'" size="small" @click="!handUpObj.handUp && addRemark">备注</el-button>
          <el-button :class={btn_unable:handUpObj.handUp} :type="handUpObj.handUp?'danger':'primary'" size="small" @click="!handUpObj.handUp && openDecisionDialog">决策</el-button>
          <el-button type="primary" size="small" @click="!handUpObj.handUp?openContactDialog('REGISTER_UP'):openContactDialog('REGISTER_DOWN')">{{!handUpObj.handUp?"用户挂起":'取消挂起'}}
            <br :class='{dis_none:!handUpObj.handUp}'>{{!handUpObj.handUp?'':`(${handUpObj.minute}min${handUpObj.second}s)`}}</el-button>
          <el-button :class={btn_unable:handUpObj.handUp} :type="handUpObj.handUp?'danger':'primary'" size="small" @click="!handUpObj.handUp && openContactDialog('CONTACT_UP')">联系人挂起</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding:10px 0px 4px 0px">
      <el-col :span="2"><span>当前状态:</span></el-col>
      <el-col :span="8"><span>{{applicationInfo.manualStatus || this.deficiency}}</span></el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-row class='line_1'>
          <el-col :span="3"><span class="ft-12">姓名:</span></el-col>
          <el-col :span="3"><span class="c708090">{{customerInfo.name || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">进件ID:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.loanId || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">进件时间:</span></el-col>
          <el-col :span="7"><span class="c708090">{{customerInfo.loanTime || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_2'>
          <el-col :span="3"><span class="ft-12">性别:</span></el-col>
          <el-col :span="3"><span class="c708090">{{customerInfo.gender || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">身份证号:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.idNo || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">注册时间:</span></el-col>
          <el-col :span="7"><span class="c708090">{{customerInfo.registerTime || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_3'>
          <el-col :span="3"><span class="ft-12">年龄:</span></el-col>
          <el-col :span="3"><span class="c708090">{{customerInfo.age || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">所在行业:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.profession || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">公司名称:</span></el-col>
          <el-col :span="7"><span class="c708090">{{customerInfo.companyName || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_4'>
          <el-col :span="3"><span class="ft-12">贷款金额:</span></el-col>
          <el-col :span="3"><span class="c708090">{{customerInfo.amount || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">贷款期数:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.period || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">借款用途:</span></el-col>
          <el-col :span="7"><span class="c708090">{{customerInfo.loanUsage || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_5'>
          <el-col :span="3"><span class="ft-12">产品类型:</span></el-col>
          <el-col :span="3"><span class="c708090">{{this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">系统审核建议:</span></el-col>
          <el-col :span="5"><span class="c708090">{{this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">是否续贷:</span></el-col>
          <el-col :span="7"><span class="c708090">{{customerInfo.verifySource == 1 ? '是' : '否'}}</span></el-col>
        </el-row>
        <el-row class='line_6'>
          <el-col :span="3"><span class="ft-12">人工审核建议:</span></el-col>
          <el-col :span="3"><span class="c708090">{{this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">决策信息:</span></el-col>
          <el-col :span="7"><span class="c708090">{{customerInfo.decision || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_7' style='margin-top: 15px;'>
          <el-col :span="3"><span class="ft-12">房贷:</span></el-col>
          <el-col :span="3"><span class="c708090">{{customerInfo.hasHouseLoan || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">车贷:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.hasCarLoan || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">其他贷款:</span></el-col>
          <el-col :span="7"><span class="c708090">{{customerInfo.otherLoan || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_8'>
          <el-col :span="3"><span class="ft-12">QQ号:</span></el-col>
          <el-col :span="3"><span class="c708090">{{customerInfo.qq || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">微信号:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.weChat || this.deficiency}}</span></el-col>
          <el-col :span="3"><span class="ft-12">月收入:</span></el-col>
          <el-col :span="7"><span class="c708090">{{customerInfo.salary || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_9'>
          <el-col :span="3"><span class="ft-12">家庭地址:</span></el-col>
          <el-col :span="21"><span class="c708090">{{customerInfo.livingAddress || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_10'>
          <el-col :span="3"><span class="ft-12">公司地址:</span></el-col>
          <el-col :span="21"><span class="c708090">{{customerInfo.companyAddress || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_11'>
          <el-col :span="8"><span class="ft-12">身份证号与手机号是否匹配:</span></el-col>
          <el-col :span="16"><span class="c708090">{{customerInfo.checkIdNumRegisterPhoneMatch || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_12'>
          <el-col :span="8"><span class="ft-12">注册手机号与预留手机号是否一致:</span></el-col>
          <el-col :span="16"><span class="c708090">{{customerInfo.checkRegisterReservedPhoneSame || this.deficiency}}</span></el-col>
        </el-row>
        <el-row class='line_13'>
          <el-col :span="8"><span class="ft-12">注册手机号与淘宝手机号是否一致:</span></el-col>
          <el-col :span="16"><span class="c708090">{{customerInfo.checkRegisterTaobaoPhoneSame || this.deficiency}}</span></el-col>
        </el-row>
        <!--         <el-row>
          <el-col :span="3"><span class="ft-12">婚姻状况:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.marriage || this.deficiency}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="3"><span class="ft-12">居住时长:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.livingTime || this.deficiency}}</span></el-col>
        </el-row>
        <el-row style="margin-top:15px">
          <el-col :span="3"><span class="ft-12">岗位级别:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.position || this.deficiency}}</span></el-col>
        </el-row>
       
        <el-row style="margin-top:15px">
          <el-col :span="3"><span class="ft-12">申请时段:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.loanTimeSlot || this.deficiency}}</span></el-col>
        </el-row>
       
        <el-row>
          <el-col :span="3"><span class="ft-12">还款来源:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.repaymentSource || this.deficiency}}</span></el-col>
        </el-row>
       
        <el-row style="margin-top:15px">
          <el-col :span="3"><span class="ft-12">签约时间:</span></el-col>
          <el-col :span="5"><span class="c708090">{{customerInfo.signTime || this.deficiency}}</span></el-col>
        </el-row> -->
      </el-col>
      <el-col :span="10">
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <div v-if="!coverPhotos.positiveUrl" class="image text-center">暂无照片信息</div><img v-if="coverPhotos.positiveUrl" :src="coverPhotos.positiveUrl" class="image" @click="showDialog"></el-col>
          <el-col :span="8">
            <div v-if="!coverPhotos.faceUrl" class="image text-center">暂无照片信息</div><img v-if="coverPhotos.faceUrl" :src="coverPhotos.faceUrl" class="image" @click="showDialog"></el-col>
        </el-row>
        <div class="center-con">
          照片信息
        </div>
      </el-col>
    </el-row>
    <div class="mt10">
      <el-table size="small" class="mt10" :data="bankcardInfo" border style="width: 100%">
        <el-table-column label="银行卡信息" header-align="center">
          <el-table-column prop="bankCardNo" label="银行卡号">
          </el-table-column>
          <el-table-column prop="bankName" label="银行名称">
          </el-table-column>
          <el-table-column prop="reservedMobile" label="预留手机号">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" border size="small" class="mt10" style="width: 100%">
        <el-table-column label="常用位置信息" header-align="center">
          <el-table-column prop="date" label="触发时间">
            <template slot-scope="scope">
              {{locationInfo.triggerTime || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="触发事件">
            <template slot-scope="scope">
              {{locationInfo.triggerCase || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="经纬度">
            <template slot-scope="scope">
              {{locationInfo.longitude || this.deficiency}} , {{locationInfo.latitude || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="经纬度描述">
            <template slot-scope="scope">
              {{locationInfo.longitudeAndLatitudeDesc || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="IP">
            <template slot-scope="scope">
              {{locationInfo.ip || this.deficiency}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" border size="small" class="mt10" style="width: 100%">
        <el-table-column label="历史借款情况信息" header-align="center">
          <el-table-column prop="date" label="身份证号申请次数">
            <template slot-scope="scope">
              {{historyLoanSituationInfo.idApplyNumber || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="身份证号审核通过次数">
            <template slot-scope="scope">
              {{historyLoanSituationInfo.idQualifiedNumber || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="身份证号放款次数">
            <template slot-scope="scope">
              {{historyLoanSituationInfo.idPassNumber || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="身份证需还款数量">
            <template slot-scope="scope">
              {{historyLoanSituationInfo.idNeedRepayNumber || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="身份证号逾期次数">
            <template slot-scope="scope">
              {{historyLoanSituationInfo.idOverDueNumber || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="身份证号上次拒绝时间">
            <template slot-scope="scope">
              {{historyLoanSituationInfo.idLastRejectTime || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="身份证号上次申请时间">
            <template slot-scope="scope">
              {{historyLoanSituationInfo.idLastApplyTime || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="身份证号最大逾期天数">
            <template slot-scope="scope">
              {{historyLoanSituationInfo.idMaxOverdueDays || this.deficiency}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table class="mt10" :data="tableData" border size="small" style="width: 100%">
        <el-table-column label="借款历史" header-align="center">
          <el-table-column prop="date" label="进件时间">
            <template slot-scope="scope">
              {{loanHistoryInfo.loanTime || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="借款金额">
            <template slot-scope="scope">
              {{loanHistoryInfo.loanAmount || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="期数">
            <template slot-scope="scope">
              {{loanHistoryInfo.loanPeriod || this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="结算时间">
            <template slot-scope="scope">
              <span>{{loanHistoryInfo.payoffDate || this.deficiency}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="放款时间">
            <template slot-scope="scope">
              {{this.deficiency}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="最大逾期天数">
            <template slot-scope="scope">
              {{loanHistoryInfo.maxOverdueDays || this.deficiency}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <imgDialog ref="imgDialog" :userPhotos="userPhotos"></imgDialog>
  </div>
</template>
<script>
import TabPage from "@/components/TabPage"
import imgDialog from "@/components/imgDialog"
import ajax from "@/utils/ajax"
import dateFormat from "@/utils/dateFormat"
// import serve from './serve'

export default {

  props: ['applicationInfo', 'type'],
  data() {
    return {
      deficiency: `--`,
      tableData: [{}],
      bankcardInfo: [],
      customerInfo: {},
      historyLoanSituationInfo: {},
      loanHistoryInfo: {},
      locationInfo: {},
      coverPhotos: {},
      userPhotos: [],
      remarkInfo: {},
      //mock
      handUpObj: {
        handUp: true,
        // handup:false,
        handUpTime: 1524812321,
        minute: '',
        second: '',
        onoff:'',
      },
    }
  },

  filters: {
    dealTime(val) {
      return val ? dateFormat(val, 'yyyy-MM-dd hh:mm:ss') : this.deficiency
    },
  },
  mounted() {

  },
  created() {
    this.getDetail();
    this.getPhoto();
  },
  beforeDestroy(){
    this.handUpObj.handUp=false;
  },
  methods: {
    getPhoto() {
      let _this = this
      ajax({
        url: '/application/userinfo/photo',
        params: { userKeys: _this.applicationInfo.userkey },
        success(res) {
          _this.coverPhotos = res.data.coverPhotos || {}
          _this.userPhotos = res.data.userPhotos || []
        },
        error(res) {
          _this.$notify.error({
            title: '错误',
            message: res.message || '未知错误'
          });
        }
      })
    },
    getHandUpTime() {
      var _this = this;
      var key=this.handUpObj.onoff;
      var timer1 = setInterval(function() {
        if (!_this.handUpObj.handUp) {
          clearInterval(timer1);
          return;
        }
        if (localStorage.single_onoff!=key) {
          clearInterval(timer1);
          return;
        }
        var now = new Date();
        var record = _this.handUpObj.handUpTime * 1000;
        var time = Math.floor((now - record) / 1000);
        _this.handUpObj.minute = Math.floor(time / 60);
        var second = Math.floor(time % 60);
        _this.handUpObj.second = second < 10 ? '0' + second : second;
        _this.$emit('handupInterval',_this.handUpObj);
        console.log(record,time,_this.handUpObj);
      }, 1000);
    },
    getDetail() {
      let _this = this
      ajax({
        url: '/application/detail',
        params: { applicationId: _this.applicationInfo.applicationId },
        success(res) {
          _this.bankcardInfo = res.data.bankcardInfo || [];
          _this.customerInfo = res.data.customerInfo || {};
          _this.historyLoanSituationInfo = res.data.historyLoanSituationInfo || {};
          _this.loanHistoryInfo = res.data.loanHistoryInfo || {};
          _this.locationInfo = res.data.locationInfo || {};
          _this.handUpObj.onoff=new Date();
          localStorage.single_onoff=_this.handUpObj.onoff;
          _this.getHandUpTime();
        },
        error(res) {
          _this.$notify.error({
            title: '错误',
            message: res.message || '未知错误'
          });
        }
      })
    },
    addRemark() {
 
      this.$emit('addRemark')
    },
    openContactDialog(auditStatus) {
      this.$emit('openContactDialog', auditStatus)
    },
    getRemark() {
      let _this = this
      ajax({
        url: '/application/remark/get',
        params: { applicationId: _this.applicationInfo.applicationId },
        success(res) {
          let remarkInfo = res.data
          let remarkArr = []
          let key = ['idCardInfo', 'loanPurpose', 'otherRisk', 'phoneEmailInfo'];
          key.forEach((item) => {
            remarkArr.push(remarkInfo[item])
          })
          if (remarkInfo.contacts) {
            remarkArr.push('contact')
          } else {
            remarkArr.push('')
          }
          let tag = remarkArr.every((item) => {
            return item
          })
          if (tag) {
            _this.$emit('openDecisionDialog')
          } else {
            _this.$message({
              message: '该进件备注信息不完整',
              type: 'warning',
              duration: 5000
            });
          }
        },
        error(res) {
          _this.$notify.error({
            title: '错误',
            message: res.message || '未知错误'
          });
        }
      })
    },
    openDecisionDialog() {

      this.getRemark();
    },
    showDialog() {
      if (this.userPhotos.length) {
        this.userPhotos.forEach((item) => {
          item['rotate'] = 0
        })
      }
      this.$refs.imgDialog.$emit('show')
    },
    openTelephoneInfo() {
      this.$emit('openTelephoneInfo')
    }
  },
  components: {
    TabPage,
    imgDialog
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dis_none {
  display: none;
}

.btn_unable {
  color: #333;
  background: #eee;
  border: 1px solid #eee;
}

.ft-12 {
  font-weight: bold;
  font-size: 12px;
}

.el-row {
  margin: 0px 0;
}

.c708090 {
  color: #708090;
  font-size: 12px;
}

.mt10 {
  margin-top: 10px
}

.center-con {
  text-align: center;
  margin-top: 25px
}

.text-center {
  text-align: center;
}

.image {
  width: 200px;
  height: 200px;
}

</style>
