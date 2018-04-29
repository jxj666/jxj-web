<template>
  <div class="">
    <el-dialog title="备注信息" :visible.sync="dialogTableVisible">
      <el-form  label-width="150px" :model="queryParams">
        <el-form-item>
          <el-button type="primary" @click="addNewRemark" size="small">新增备注信息</el-button>
        </el-form-item>
        <el-form-item label="身份证信息核对:">
          <el-input type="textarea" autosize placeholder="请输入内容" :maxlength="maxlength" v-model="queryParams.idCardInfo" class="w180" size="small"></el-input>
        </el-form-item>
        <el-form-item label="得知途径及借款用途:">
          <el-input type="textarea" autosize placeholder="请输入内容" :maxlength="maxlength"  v-model="queryParams.loanPurpose" class="w180" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱及手机信息:">
          <el-input type="textarea" autosize placeholder="请输入内容" :maxlength="maxlength" v-model="queryParams.phoneEmailInfo" class="w180" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系人信息核对:">
          <el-input type="textarea" autosize placeholder="请输入内容" :maxlength="maxlength" v-model="info" class="w180" size="small"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="id" placeholder="请选择" class="w180" size="small">
            <el-option label="空" value=" "></el-option>
            <el-option
              v-for="item in dictionaryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他风险排查:">
          <el-input type="textarea" autosize :maxlength="maxlength" placeholder="请输入内容" v-model="queryParams.otherRisk" class="w180" size="small"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
          <div class="" v-if="remark.length" v-for="item in remark">
            <el-form-item>
              <el-input type="textarea" autosize placeholder="请添加备注值" v-model="item.key" class="w130" size="small"></el-input>
            </el-form-item>
            <el-form-item label=":">
              <el-input type="textarea" autosize placeholder="请添加备注值" v-model="item.value" class="w180" size="small"></el-input>
            </el-form-item>
          </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="dialogTableVisible = false">返回</el-button>
       <el-button type="primary" @click="setRemark">确认</el-button>
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
        queryParams: {
          contacts:{
            id: '',
            info: ''
          },
          idCardInfo: '',
          loanPurpose: '',
          otherRisk: '',
          phoneEmailInfo: ''
        },
        dictionaryList: [],
        id: '',
        info: '',
        remark: [],
        maxlength: 200
      }
    },
    mounted(){
        this.$on('show', () => {
           this.dialogTableVisible = true
           this.clearData()
           this.getDictionary()
        })
    },
    methods: {
      clearData () {
        this.remark = []
        if (typeof this.queryParams.contacts !== 'object') {
          this.queryParams.contacts = JSON.parse(this.queryParams.contacts)
        }
        this.queryParams.contacts.id = ''
        this.queryParams.contacts.info = ''
        this.queryParams.idCardInfo = ''
        this.queryParams.loanPurpose = ''
        this.queryParams.otherRisk = ''
        this.queryParams.phoneEmailInfo = ''
        this.id = ''
        this.info = ''
      },
      setRemark () {
        this.queryParams.applicationId = this.applicationId
        this.queryParams.remark = this.remark
        this.queryParams.contacts.id = this.id
        this.queryParams.contacts.info = this.info
        let _this = this
        ajax({
          url: '/application/remark/add',
          data: _this.queryParams,
          success(){
            _this.dialogTableVisible = false
            _this.$notify({
              title: '成功',
              message: '备注信息添加成功',
              type: 'success'
            });
          },
          error(res){
            _this.dialogTableVisible = false
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
      addNewRemark () {
        const MAX = 3
        if(this.remark.length < MAX) {
          this.remark.push({ key: '', value: ''})
        }else {
          this.$message({
            message: '新增备注信息最多可添加三条',
            type: 'warning'
          });
        }

      },
      /**
      *获取联系人字典
      */
      getDictionary () {
        let _this = this
        ajax({
          url: '/application/dictionary',
          success(res){
            _this.dictionaryList = res.data.contact
            _this.getRemark()
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      },
      getRemark () {
        let _this = this
        ajax({
          url: '/application/remark/get',
          params: { applicationId: _this.applicationId },
          success(res){
              if (res.data && res.data.contacts) {
                _this.id = Number(res.data.contacts.id) || ''
                _this.info = res.data.contacts.info || ''
              }
              _this.queryParams.idCardInfo = res.data.idCardInfo || ''
              _this.queryParams.loanPurpose = res.data.loanPurpose || ''
              _this.queryParams.otherRisk = res.data.otherRisk || ''
              _this.queryParams.phoneEmailInfo = res.data.phoneEmailInfo || ''
              if (res.data && res.data.remark) {
                _this.remark = res.data.remark
              }
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      }
    },
    components: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w180 {
  width: 240px
}
.w130 {
  width: 130px;
}
</style>
