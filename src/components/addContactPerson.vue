<template>
  <div class="">
    <el-dialog title="新增紧急联系人" :visible.sync="dialogTableVisible" width="30%">
      <el-form  label-width="80px" :model="queryParams">
        <el-form-item label="姓名:">
          <el-input v-model="queryParams.contactName" class="w180" size="small"></el-input>
        </el-form-item>
        <el-form-item label="关系:">
          <el-input v-model="queryParams.relation" class="w180" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="queryParams.contactMobile" class="w180" size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="dialogTableVisible = false">返回</el-button>
       <el-button type="primary" @click="addConPerson">提交</el-button>
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
          contactMobile: '',
          contactName: '',
          relation: '',
        }
      }
    },
    mounted(){
        this.$on('show', () => {
           this.dialogTableVisible = true
           this.clearData()
        })
    },
    methods: {
      isPhoneAvailable (phone) {
         var reg=/^[1][3,4,5,6,7,8][0-9]{9}$/;
         return reg.test(phone) || false;
      },
      clearData () {
        this.queryParams.contactMobile = ''
        this.queryParams.contactName = ''
        this.queryParams.relation = ''
      },
      addConPerson () {
        if (!this.queryParams.contactMobile) {
          this.$notify.error({
            title: '错误',
            message: '手机号不能为空'
          });
          return false
        }
        this.queryParams.applicationId = this.applicationId
        let _this = this
        ajax({
          url: '/contact/emergency/add',
          contentType:'application/x-www-form-urlencoded;',
          isFormData: true,
          data: _this.queryParams,
          success(){
            _this.dialogTableVisible = false
            _this.$notify({
              title: '成功',
              message: '新增紧急联系人成功',
              type: 'success'
            });
            _this.$emit('loadList')
          },
          error(res){
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
            _this.dialogTableVisible = false
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
</style>
