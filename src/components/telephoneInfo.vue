<template>
  <div>
    <div v-if="type === 'todoTaskTele'" >
      <el-row>
        <el-col :span="12">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="外呼:">
              <el-input v-model="telephone" placeholder="请输入被叫号码" size="small" style="width:180px"></el-input>
            </el-form-item>
            <el-form-item>
              <a :href="callCenterUrl"
                 target="_blank"
                 class="el-button el-button--primary el-button--small"
                 style="text-decoration: none">连接呼叫中心</a>
              <el-button type="success" size="small" @click="callPhone('hand')">&nbsp;&nbsp;呼 叫&nbsp;&nbsp;
              </el-button>
              <el-button type="danger" size="small" @click="callDown">&nbsp;&nbsp;挂 机&nbsp;&nbsp;</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <div class="" style="float:right" >
            <el-button :class={btn_unable:handUpObj.handUp}  :type="handUpObj.handUp?'info':'primary'" size="small" @click="!handUpObj.handUp && addConPerson">新增紧急联系人</el-button>
            <el-button :class={btn_unable:handUpObj.handUp}  :type="handUpObj.handUp?'info':'primary'" size="small" @click="!handUpObj.handUp && addRemark">备注</el-button>
            <el-button :class={btn_unable:handUpObj.handUp}  :type="handUpObj.handUp?'info':'primary'" size="small" @click="!handUpObj.handUp && openDecisionDialog">决策</el-button>
            <el-button type="primary" size="small" @click="openContactDialog('REGISTER_UP')">{{!handUpObj.handUp?"用户挂起":'取消挂起'}}
            <br :class='{dis_none:!handUpObj.handUp}'>{{!handUpObj.handUp?'':`(${handUpObj.minute}min${handUpObj.second}s)`}}</el-button>
            <el-button :class={btn_unable:handUpObj.handUp}  :type="handUpObj.handUp?'info':'primary'" size="small" @click="!handUpObj.handUp && openContactDialog('CONTACT_UP')">联系人挂起</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="">
      <el-table
        :data="tableData"
        border
        size="small"
        style="width: 100%">
        <el-table-column label="运营商信息" header-align="center">
          <el-table-column
            prop="phoneRegister"
            label="注册手机号"
            width="160"
            >
            <template slot-scope="scope">
              <div  v-if="type === 'todoTaskTele'">
                <span class="pointer" v-if="carrierInfo.phoneRegister" @click="callPhone(carrierInfo.phoneRegister)">{{carrierInfo.phoneRegister || '--'}}<i class="fa fa-phone fa-lg ml10 c409EFF"></i></span>
              </div>
              <div  v-if="type !== 'todoTaskTele'">
                {{carrierInfo.phoneRegister || '--'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="carrierCode"
            label="运营商信息"
            >
            <template slot-scope="scope">
              {{carrInfo[carrierInfo.carrierCode] | filterInvalid}}
            </template>
          </el-table-column>
          <el-table-column
            prop="phoneInUseTime"
            label="手机号使用时长">
            <template slot-scope="scope">
              <span v-if="carrierInfo.phoneInUseTime">{{carrierInfo.phoneInUseTime}}个月</span>
              <span v-if="!carrierInfo.phoneInUseTime">--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="phonePackageType"
            label="手机套餐类型">
            <template slot-scope="scope">
              {{carrierInfo.phonePackageType | filterInvalid}}
            </template>
          </el-table-column>
          <el-table-column
            prop="phoneBalance"
            label="手机账户余额">
            <template slot-scope="scope">
              {{carrierInfo.phoneBalance | filterInvalid}}
            </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="实名认证姓名">
            <template slot-scope="scope">
              {{carrierInfo.realName | filterInvalid}}
            </template>
          </el-table-column>
          <el-table-column
            prop="certNumber"
            label="证件号码">
            <template slot-scope="scope">
              {{carrierInfo.certNumber | filterInvalid}}
            </template>
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别">
            <template slot-scope="scope">
              {{carrierInfo.gender | filterInvalid}}
            </template>
          </el-table-column>
          <el-table-column
            prop="inNetDate"
            label="入网时间">
            <template slot-scope="scope">
              {{carrierInfo.inNetDate | dealTime}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData"
        border
        size="small"
        class="mt15"
        style="width: 100%">
        <el-table-column label="催收信息" header-align="center">
          <el-table-column
            prop="date"
            label="接到催收电话数">
            <template slot-scope="scope">
              {{collectionInfo.callNumbers || '--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="接到催收电话号码数">
            <template slot-scope="scope">
              {{collectionInfo.phoneNumbers || '--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="接通催收电话数">
            <template slot-scope="scope">
              {{collectionInfo.incomingNumber || '--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="接通催收电话通话时长">
            <template slot-scope="scope">
              {{collectionInfo.incomingTimes | filtersTime}}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="打出催收电话数">
            <template slot-scope="scope">
              {{collectionInfo.outcomingNumber || '--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="打出催收电话通话时长">
            <template slot-scope="scope">
              {{collectionInfo.outcomingTimes | filtersTime}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-row :gutter="15" class="mt15">
        <el-col :span="8">
          <el-row>
            <el-col :span="24">
              <el-table
                :data="emergencyContact"
                border
                size="small"
                style="width: 100%">
                <el-table-column
                  header-align="center"
                  label="紧急联系人详情"
                  >
                  <el-table-column
                    prop="contactName"
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="contactNickname"
                    label="通讯录昵称">
                  </el-table-column>
                  <el-table-column
                    prop="relation"
                    label="关系">
                  </el-table-column>
                  <el-table-column
                    prop="mobile"
                    label="手机号">
                    <template slot-scope="scope">
                      <div  v-if="type === 'todoTaskTele'">
                        <span class="pointer" if="scope.row.mobile" @click="callPhone(scope.row.mobile)"> {{scope.row.mobile || '--'}}<i class="fa fa-phone fa-lg ml10 c409EFF"></i></span>
                      </div>
                      <div v-if="type !== 'todoTaskTele'">
                        {{scope.row.mobile || '--'}}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="contactDuration"
                    :formatter="formatTalkTime"
                    label="通话时长">
                  </el-table-column>
                  <el-table-column
                    prop="contactCount"
                    label="通话次数">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row class="mt15">
            <el-col :span="24">
              <el-table
                :data="highFrequencyContact"
                border
                size="small"
                style="width: 100%">
                <el-table-column
                  header-align="center"
                  label="高频联系人信息"
                  >
                  <el-table-column
                    prop="callToMobileName"
                    label="通讯录昵称">
                  </el-table-column>
                  <el-table-column
                    prop="toMobile"
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop="duration"
                    :formatter="formatTalkTime"
                    label="通话时长">
                  </el-table-column>
                  <el-table-column
                    prop="callCount"
                    label="通话次数">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row class="mt15">
            <el-col :span="24">
              <el-table
                :data="personalOtherContact"
                border
                size="small"
                style="width: 100%">
                <el-table-column
                  header-align="center"
                  label="本人其他号码信息"
                  >
                  <el-table-column
                    prop="name"
                    label="通讯录昵称">
                  </el-table-column>
                  <el-table-column
                    prop="mobile"
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop="contactDuration"
                    :formatter="formatTalkTime"
                    label="通话时长">
                  </el-table-column>
                  <el-table-column
                    prop="contactCount"
                    label="通话次数">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row class="mt15">
            <el-col :span="24">
              <el-table
                :data="riskContact"
                border
                size="small"
                style="width: 100%">
                <el-table-column
                  header-align="center"
                  label="风险联系人详情"
                  >
                  <el-table-column
                    prop="name"
                    label="通讯录昵称">
                  </el-table-column>
                  <el-table-column
                    prop="mobile"
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop="contactDuration"
                    :formatter="formatTalkTime"
                    label="通话时长">
                  </el-table-column>
                  <el-table-column
                    prop="contactCount"
                    label="通话次数">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item >
              <el-input  placeholder="姓名" size="small" style="width:120px" v-model="name"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input  placeholder="手机号" size="small" style="width:120px" v-model="mobile"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button   type="primary" size="small" @click="searchPhoneBooks">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="phoneBooks"
            border
            size="small"
            height="520"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              header-align="center"
              :label="address"
              >
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="通讯录昵称">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="手机号">
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="8">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="详单查询:">
              <el-input  placeholder="手机号" size="small" style="width:120px" v-model="callDetailPhone"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button   type="primary" size="small" @click="searchCallDetail">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="callHistoryDetail"
            height="520"
            border
            size="small"
            :default-sort = "{prop: 'startTime', order: 'descending'}"
            style="width: 100%">
            <el-table-column
              header-align="center"
              :label="phoneDetail"
              >
              <el-table-column
                prop="callType"
                width="80"
                label="呼叫类型">
              </el-table-column>
              <el-table-column
                prop="callToMobileName"
                  width="80"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="toMobile"
                label="号码">
              </el-table-column>
              <el-table-column
                prop="startTime"
                sortable
                :formatter="dealDate"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="duration"
                :formatter="formatTalkTime"
                  width="80"
                label="时长">
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <addContactPerson  ref="addContactPerson" @loadList="loadList" :applicationId="applicationInfo.applicationId"></addContactPerson>
  </div>
</template>

<script>
import ajax from "@/utils/ajax"
import dateFormat from "@/utils/dateFormat"
import addContactPerson from "./addContactPerson"
import auth from '@/utils/authenticate'

  export default {
  	props:[ 'type', 'applicationInfo','handUpObj' ],
    data () {
      return {
        callDetailPhone: '',
        name: '',
        mobile: '',
        tableData:[{}],
        address:'通讯录',
        phoneDetail: '90天通话详情',
        bankcardInfo: {},
        loanHistoryInfo: {},
        telephone: '',
        callCenterUrl: '/callcenter',
        phoneBooks: [],
        phoneBooksSearch: [],
        callHistoryDetail: [],
        callHistoryDetailSearch: [],
        highFrequencyContact: [],
        personalOtherContact: [],
        riskContact: [],
        carrInfo: {10086:'中国移动',10010:'中国联通',10000:'中国电信'},
        emergencyContact: [],//新增紧急联系人
        carrierInfo: {},//运营商信息
        collectionInfo: {},// 催收信息
        loginUid: '',//   工号 
         
      }
    },
    methods: {
      isPhoneAvailable (phone) {
         var reg=/^[1][3,4,5,6,7,8][0-9]{9}$/;
         return reg.test(phone) || false;
      },
      formatTalkTime(row, column){
        let val = row[column['property']] || 0;
        var h = Math.floor(val / 3600);
        h = h > 9 ? h : ('0' + h);
        var m = Math.floor((val / 60 % 60));
        m = m > 9 ? m : ('0' + m);
        var s = Math.floor((val % 60));
        s = s > 9 ? s : ('0' + s);
        return h + ":" + m + ":" + s;
      },
      dealDate(row, column) {
        return dateFormat(row[column['property']], 'yyyy-MM-dd hh:mm:ss');
      },
      searchPhoneBooks () {
        if (this.name || this.mobile) {
            let nameIndex = -1
            let mobileIndex = -1
            this.phoneBooksSearch.forEach((item, idx) => {
              if (item.mobile === this.mobile.trim()) {
                  mobileIndex = idx
              }
              if (item.name === this.name.trim()) {
                  nameIndex = idx
              }
            })
          let arr = [];
          if (mobileIndex!==-1) {
            arr.push(this.phoneBooksSearch[mobileIndex])
          }
          if (nameIndex!==-1) {
            arr.push(this.phoneBooksSearch[nameIndex])
          }
          this.phoneBooks = arr
          this.address =`通讯录(${this.phoneBooks.length}条)`
        }else{
          this.phoneBooks = this.phoneBooksSearch
          this.address =`通讯录(${this.phoneBooks.length}条)`
        }
      },
      searchCallDetail () {
        if (!this.callDetailPhone.trim()) {
          this.callHistoryDetail = this.callHistoryDetailSearch
          this.phoneDetail =`90天通话详情(${this.callHistoryDetail.length}条)`
          return false
        }
        let index = [];
        this.callHistoryDetailSearch.forEach((item, idx) => {
          if (item.toMobile === this.callDetailPhone.trim()) {
              index.push(idx)
          }
        })
        if (index.length === 0) {
          this.callHistoryDetail = []
          this.phoneDetail =`90天通话详情(${this.callHistoryDetail.length}条)`

        }else{
          this.callHistoryDetail = index.map((item, index) => {
            return this.callHistoryDetailSearch[item]
          })
          this.phoneDetail =`90天通话详情(${this.callHistoryDetail.length}条)`
        }
      },
      addConPerson () {
        this.$refs.addContactPerson.$emit('show')
      },
      loadList () {
        this.getEmergencyContact()
        this.getPhoneBook()
      },
      /**
      * 通讯录
      */
      getPhoneBook () {
        let _this = this
        ajax({
          url: '/contact/phonebook/get',
          params: { loanKey: _this.applicationInfo.loanKey },
          success(res){
            _this.phoneBooksSearch = res.data.phoneBooks || []
            _this.phoneBooks = res.data.phoneBooks || []
            _this.address =`通讯录(${_this.phoneBooks.length}条)`
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
      /**
      * 90天通话详情
      */
      getCallHistoryDetail () {
        let _this = this
        ajax({
          url: '/contact/callhistory/contactdetail',
          params: { loanKey: _this.applicationInfo.loanKey },
          success(res){
            _this.callHistoryDetailSearch = res.data.details || []
            _this.callHistoryDetail = res.data.details || []
            _this.phoneDetail =`90天通话详情(${_this.callHistoryDetail.length}条)`
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
      /**
      * 查询联系人信息
      */
      getContactInfo () {
        let _this = this
        ajax({
          url: '/contact/phonebook/detail',
          params: { loanKey: _this.applicationInfo.loanKey },
          success(res){
            _this.highFrequencyContact = res.data.highFrequencyContact || []
            _this.personalOtherContact = res.data.personalOtherContact || []
            _this.riskContact = res.data.riskContact || []
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
      /**
      * 紧急联系人查询
      */
      getEmergencyContact () {
        let _this = this
        ajax({
          url: '/contact/emergency/detail',
          params: { loanKey: _this.applicationInfo.loanKey },
          success(res){
            _this.emergencyContact = res.data.emergencyContact || []
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
      /**
      * 运营商信息
      */
      getCarrierInfo () {
        let _this = this
        ajax({
          url: '/contact/carrier/info',
          params: { loanKey: _this.applicationInfo.loanKey, applicationId: _this.applicationInfo.applicationId},
          success(res){
            _this.carrierInfo = res.data.carrierInfo || {}
            _this.collectionInfo = res.data.collectionInfo || {}
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
      openDecisionDialog () {
        this.getRemark()
      },
      openContactDialog(auditStatus) {
        this.$emit('openContactDialog',auditStatus)
      },
      addRemark () {
        this.$emit('addRemark')
      },
      callPhone(phone){
        let tel = phone === 'hand' ? this.telephone : phone;
        let cbFlag = ATPlaceCall(this.loginUid, '9'+tel);
        if (cbFlag == 'OK') {
          this.$notify.success({
            title: '成功',
            message: '拨出成功',
            duration: 2000,
          });
        } else {
          this.$notify.error({
            title: '提示',
            message: '请检查软电话登陆是否成功',
            duration: 2000,
          });
        }
      },
      callDown(){
          let callDown = ATHangup(this.loginUid, "");
          if (callDown == 'OK') {
            this.$notify.success({
              title: '成功',
              message: '挂机成功',
              duration: 3000,
            });
          } else {
            this.$notify.error({
              title: '提示',
              message: '挂机失败',
              duration: 2000,
            });
          }
      },
      tableRowClassName({row, rowIndex}) {
        if (row.tag) {
          return 'success-row';
        }
        return '';
      },
      getRemark () {
        let _this = this
        ajax({
          url: '/application/remark/get',
          params: { applicationId: _this.applicationInfo.applicationId },
          success(res){
              let remarkInfo = res.data
              let remarkArr = []
              let key = ['idCardInfo','loanPurpose','otherRisk','phoneEmailInfo'];
              key.forEach((item)=>{
                  remarkArr.push(remarkInfo[item])
              })
              if (remarkInfo.contacts) {
                  remarkArr.push('contact')
              }else{
                remarkArr.push('')
              }
              let tag = remarkArr.every((item)=>{
                return item
              })
              if (tag) {
                _this.$emit('openDecisionDialog')
              }else {
                 _this.$message({
                  message: '该进件备注信息不完整',
                  type: 'warning',
                  duration: 5000
                });
              }
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
    },
    created(){

    },
    filters: {
      filterInvalid (val) {
        if (val) {
          if (val === 'Invalid') {
            return '--'
          }else {
            return val
          }
        }else {
          return '--'
        }
      },
      dealTime (val) {
        return val ?  dateFormat(val,'yyyy-MM-dd hh:mm:ss') : '--'
      },
      filtersTime(val){
        if (!val) {
          return '--'
        }
        var h = Math.floor(val / 3600);
        h = h > 9 ? h : ('0' + h);
        var m = Math.floor((val / 60 % 60));
        m = m > 9 ? m : ('0' + m);
        var s = Math.floor((val % 60));
        s = s > 9 ? s : ('0' + s);
        return h + ":" + m + ":" + s;
      },
    },
    mounted(){
      let employeeId =  auth.getEmployee().employeeId
      setInterval(() => {
        this.loginUid = localStorage.getItem('loginUid') || employeeId
      },3000)
      this.getPhoneBook()
      this.getCallHistoryDetail()
      this.getContactInfo()
      this.getEmergencyContact()
      this.getCarrierInfo()
    },
    components: {
      addContactPerson
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.dis_none {
  display: none;
}

.btn_unable {
  color: #333;
  background: #eee;
  border: 1px solid #eee;
}
  .mt15{
    margin-top: 15px;
  }
  .el-table .success-row {
    background: #409EFF
  }
  .ml10 {
    margin-left: 10px
  }
  .pointer {
     cursor: pointer;
  }
  .c409EFF{
    color:#409EFF
  }
</style>
