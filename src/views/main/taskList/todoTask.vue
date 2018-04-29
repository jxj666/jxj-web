<template>
  <div class="">
    <tab-page ref="tabPage">
      <template slot="todoTask">
        <data-table :data-table="dataTable" ref="dataTable">
          <div slot="conditions" class="top">
              <el-form :inline="true" :model="queryParams">
                <el-form-item>
                  <el-select v-model="keywordsType" size="small" class="w100">
                    <!-- <el-option label="全部" value=""></el-option> -->
                    <el-option
                      v-for="item in conditionSelect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="keywordsValue" placeholder="" size="small" class="w120"></el-input>
                </el-form-item>
                <el-form-item label="审核状态">
                  <el-select v-model="queryParams.manualStatus" size="small">
                    <el-option
                      v-for="item in manualStatusData"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <span>进件时间:</span>
                	<el-date-picker
                	     v-model="queryParams.startPushTime"
                	     type="datetime"
                       value-format="yyyy-MM-dd HH:mm:ss"
                	     placeholder="选择日期时间" size="small">
                	 </el-date-picker>
                </el-form-item>
                <el-form-item label="至">

                </el-form-item>
                <el-form-item>
                	<el-date-picker
                	     v-model="queryParams.endPushTime"
                	     type="datetime"
                       value-format="yyyy-MM-dd HH:mm:ss"
                	     placeholder="选择日期时间" size="small">
                	 </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          <template slot="columns" >
            <el-table-column prop="pageIndex" label="序号"></el-table-column>
            <el-table-column prop="loanId" label="进件ID"></el-table-column>
            <el-table-column prop="userName" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="idCard" label="身份证号"></el-table-column>
            <el-table-column prop="manualStatus" label="审核状态"></el-table-column>
            <el-table-column prop="operatorUserName" label="审核人员"></el-table-column>
            <el-table-column prop="signTime" label="签约时间" :formatter="dealDate"></el-table-column>
            <el-table-column prop="pushTime" label="进件时间" :formatter="dealDate"></el-table-column>
            <el-table-column label="详情">
              <template slot-scope="scope">
                <el-button @click="openPage(scope.row)" type="primary" size="small">审核</el-button>
              </template>
            </el-table-column>
          </template>
        </data-table>
      </template>
      <telephone-info slot="telephoneInfo" :handUpObj='handUpObj' :applicationInfo="applicationInfo" :type="type"  @addRemark="addRemark" @openDecisionDialog="openDecisionDialog"  @openContactDialog="openContactDialog" ></telephone-info>
      <detail slot="detail" :type="type" :applicationInfo="applicationInfo" @openTelephoneInfo="openTelephoneInfo" @addRemark="addRemark" @openDecisionDialog="openDecisionDialog" @openContactDialog="openContactDialog" @handupInterval='handupInterval'></detail>

    </tab-page>
    <remark ref="remark" :applicationId="applicationInfo.applicationId" ></remark>
    <decisionDialog ref="decisionDialog" @handleRemove="handleRemove" :applicationId="applicationInfo.applicationId" @reloadTodoList="reloadTodoList"></decisionDialog>
    <contactDialog ref="contactDialog" @handleRemove="handleRemove" :applicationId="applicationInfo.applicationId" @reloadTodoList="reloadTodoList" @listChange='listChange'></contactDialog>
  </div>
</template>

<script>
  import TabPage from "@/components/TabPage"
  import DataTable from "@/components/DataTable2"
  import telephoneInfo from "@/components/telephoneInfo"
  import Detail from "@/components/Detail"
  import dateFormat from "@/utils/dateFormat"
  import remark from "./remark"
  import decisionDialog from "./decisionDialog"
  import contactDialog from './contactDialog'
  import auth from '@/utils/authenticate'
  import ajax from "@/utils/ajax"


  export default {
    data () {
      return {
        dataTable: {
          pageSize: 30,
          pageSizes: [10, 30, 50, 100],
          url: "/application//list",
          queryParams: {
            endPushTime: '',
            idcardNumber: '',
            loanId: '',
            manualStatus: 'AUDIT',
            mobile: '',
            operatorUserName: '',
            startPushTime: '',
            userName:'',
            startClosureTime: '',
            endClosureTime: '',
            type: '',
          },
          emptyText: '没有记录',
          contentType:'application/x-www-form-urlencoded;',
          isFormData: true,
        },
        queryParams: {
          endPushTime: '',
          idcardNumber: '',
          loanId: '',
          manualStatus: 'AUDIT',
          mobile: '',
          operatorUserName: '',
          startPushTime: '',
          userName: '',
          startClosureTime: '',
          endClosureTime: '',
          type: '',
        },
        keywordsType: 'userName',
        applicationInfo: {},
        keywordsValue: '',
        type: 'todoTask',
        conditionSelect: [],
        manualStatusData:[ { name: '全部', code: 'AUDIT' }, { name: '待审核', code: 'TO_AUDIT' }, { name: '用户挂起', code: 'REGISTER_UP' }, { name: '联系人挂起', code: 'CONTACT_UP' } ],
        handUpObj:{},

      }
    },
    mounted(){
     
      var defaultPage = {label: "待办任务", name: "todoTask", slotName: 'todoTask', closable: false};
      if (auth.isRoleSign() === 'true') {
        this.conditionSelect = [ {label:'姓名', value:'userName'}, {label:'审核人员', value:'operatorUserName'}, {label:'身份证号', value:'idcardNumber'}, {label:'手机号', value:'mobile'}, {label:'进件ID', value:'loanId'}]
      }else{
        this.conditionSelect = [ {label:'姓名', value:'userName'}, {label:'身份证号', value:'idcardNumber'}, {label:'手机号', value:'mobile'}, {label:'进件ID', value:'loanId'}]
      }
      this.$refs.tabPage.$emit('open-tab', defaultPage);
    },
    methods: {
      dealDate(row, column) {
        return dateFormat(row[column['property']], 'yyyy-MM-dd hh:mm:ss');
      },
      handleRemove(){
        this.$refs.tabPage.$emit('handle-remove','detail');
      },
      reloadTodoList(){
        this.$refs.dataTable.$emit('load-data');
      },
      listChange(){
        this.$refs.dataTable.$emit('list-change');
      },
      addRemark () {
        this.$refs.remark.$emit('show')
      },
      openDecisionDialog () {
        this.$refs.decisionDialog.$emit('show')
      },
      onSubmit () {
        this.queryParams.operatorUserName = ''
        this.queryParams.idcardNumber = ''
        this.queryParams.mobile = ''
        this.queryParams.loanId = ''
        this.queryParams.userName = ''
        if (!!this.keywordsType) {
          this.queryParams[this.keywordsType] = this.keywordsValue;
        }
        this.dataTable.queryParams = this.queryParams;
        this.$refs.dataTable.$emit('load-data');
      },
      openPage(row) {
        this.applicationInfo = row
        // var defaultPage = {label:"基本信息", name: "baseInfo", slotName: 'baseInfo', closable: true};
        // this.$refs.tabPage.$emit('open-tab',defaultPage);
        var defaultPage = {label:"基本信息", name: "detail", slotName: 'detail', closable: true};
        this.$refs.tabPage.$emit('open-tab',defaultPage);
      },
      openTelephoneInfo () {
        this.type = 'todoTaskTele'// 区分紧急联系人
        var defaultPage = {label:"手机号信息", name: "telephoneInfo", slotName: 'telephoneInfo', parentName:'detail', closable: true};
        this.$refs.tabPage.$emit('open-tab',defaultPage);
      },
      openContactDialog (auditStatus) {
        this.$refs.contactDialog.$emit('show', auditStatus)
      },
      handupInterval(data){
        this.handUpObj=data;
      }
    },
    components: {
      TabPage,
      DataTable,
      telephoneInfo,
      Detail,
      remark,
      decisionDialog,
      contactDialog
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tabs__content {

}
</style>
