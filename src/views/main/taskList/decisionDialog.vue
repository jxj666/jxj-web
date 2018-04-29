<template>
  <div class="">
    <el-dialog title="信审决策" :visible.sync="dialogTableVisible" width="40%">
      <div class="mt20 mb20" v-if="!show">
        <el-alert
            title="请先选择决策状态"
            type="warning"
            :closable="false"
            show-icon>
        </el-alert>
      </div>
      <div class="center">
          <el-button  :type="primaryType" @click="decisionApprove" style="padding: 20px 25px;">审 核 通 过</el-button>
          <el-button :type="dangerType" class="ml80" @click="decisionReject" style="padding: 20px 25px;"> 审 核 拒 绝</el-button>
      </div>
      <div class="center mt20" v-if="show">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="选择决策原因"
          :disabled="true"
          v-model="reasonsCon">
          </el-input>
      </div>
      <div class="mt20" v-if="show">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{name}}</span>
          </div>
          <div v-for="(item, index)  in decisionReasons">
            <div>{{item.name}}:</div>
            <el-checkbox-group v-model="reasonsGroup" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in item.child" :label="city" :key="city.id">{{city.code}} {{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
      </div>
      <div class="mt20">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="其他备注"
          v-model="remark">
          </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="openDecisionDeal">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog  :visible.sync="decisionVisible" center>
      <div style="text-align:center"><h2>请确认是否审核{{primaryType === 'primary' ? `"通过"` : `"拒绝"`}}</h2></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="decisionDeal">确 定</el-button>
        <el-button @click="decisionVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ajax from "@/utils/ajax"
  export default {
    props: [ 'applicationId' ],
    data () {
      return {
        dialogTableVisible:false,
        decisionVisible: false,
        reasons: [],
        primaryType: '',
        dangerType: '',
        remark: '',
        name: '拒绝',
        reasonsCon: '',
        reasonsGroup: [],
        decisionReasons: [],
        reject: [],
        approve: [],
        show: false
      }
    },
    methods: {
      decisionApprove () {
        this.show = true
        if (!this.primaryType) {
          this.primaryType = 'primary'
          this.dangerType = ''
          this.name = '通过'
          this.decisionReasons = this.approve
          this.reasonsGroup =[]
          this.reasonsCon = ''
        }
      },
      decisionReject () {
        this.show = true
        if (!this.dangerType) {
          this.primaryType = ''
          this.dangerType = 'danger'
          this.name = '拒绝'
          this.reasonsGroup =[]
          this.decisionReasons = this.reject
          this.reasonsCon = ''
        }
      },
      handleCheckedCitiesChange (val) {
        if (!this.primaryType&&!this.dangerType) {
          this.$notify.error({
            title: '错误',
            message:'请先选择决策状态'
          });
          return false
        }
        let reasons = ''
        let ids = []
        val.forEach( (val) => {
          let code = val.code || ''
          let name = val.name || ''
          reasons += `    ${code}  ${name}    |`
          ids.push(val.id)
        })
        this.reasonsCon = reasons
        this.reasons = [...ids]
        console.log( this.reasons)
      },
      getDictionary () {
        let _this = this
        ajax({
          url: '/application/dictionary',
          success(res){
            _this.decisionReasons = res.data.reject
            _this.reject = res.data.reject
            _this.approve = res.data.approve
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
      clearStatus () {
        this.show = false
        this.reasons = [],
        this.primaryType =  ''
        this.dangerType=  ''
        this.remark = ''
        this.name = '拒绝'
        this.reasonsCon = ''
        this.reasonsGroup = []
      },
      openDecisionDeal () {
        if (!this.primaryType&&!this.dangerType) {
          this.$notify.error({
            title: '错误',
            message:'请选择决策状态'
          });
          return false
        }
        if (!this.reasons.length) {
          this.$notify.error({
            title: '错误',
            message:'请选择决策原因'
          });
          return false
        }
        this.decisionVisible = true
      },
      decisionDeal () {
        let auditStatus =  this.primaryType ? 'APPROVE' : 'REJECT'
        let _this = this
        ajax({
          url: '/application/audit',
          data: { applicationId: _this.applicationId, auditStatus: auditStatus, reasons: _this.reasons.join(','), remark:_this.remark },
          contentType:'application/x-www-form-urlencoded;',
          isFormData: true,
          success(){
            _this.dialogTableVisible = false
            _this.decisionVisible = false
            _this.$notify({
              title: '成功',
              message: auditStatus === 'APPROVE' ? '审核通过成功' : '审核拒绝成功',
              type: 'success'
            });
            _this.$emit('reloadTodoList')
            _this.$emit('handleRemove')
          },
          error(res){
            _this.dialogTableVisible = false
            _this.decisionVisible = false
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      }
    },
    mounted(){
        this.$on('show', () => {
           this.dialogTableVisible = true
           this.clearStatus()
           this.getDictionary()

        })
    },
    components: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .center {
    text-align: center;
  }
  .ml80{
    margin-left: 120px;
  }
  .mt20{
    margin-top: 20px
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-checkbox+.el-checkbox {
    display: block;
    margin-left: 0px;
}
.mb20 {
  margin-bottom: 20px;
}
</style>
