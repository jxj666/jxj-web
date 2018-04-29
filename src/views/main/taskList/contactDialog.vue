<template>
  <div c>
    <el-dialog  :visible.sync="dialogTableVisible" center width="30%">
      <div style="text-align:center"><h2>请确认是否{{auditStatus === 'CONTACT_UP' ? `联系人` : `用户`}}挂起</h2></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="suspend">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ajax from "@/utils/ajax"
// import serve from './../../../components/serve'
  export default {
    props: [ 'applicationId' ],
    data () {
      return {
        dialogTableVisible: false,
        auditStatus: ''
      }
    },
    methods: {
      suspend () {
        let _this = this
        ajax({
          url: '/application/audit',
          params: { applicationId: _this.applicationId, auditStatus: _this.auditStatus, reasons: '', remark: ''},
          success(res){
            _this.dialogTableVisible = false
            _this.$notify({
              title: '成功',
              message: _this.auditStatus === 'CONTACT_UP' ? '联系人挂起成功' : '用户挂起成功',
              type: 'success'
            });
            _this.$emit('reloadTodoList')
            _this.$emit('handleRemove')
          },
          error(res){
            _this.$emit('listChange')
            // serve.$emit('list-change');
            _this.dialogTableVisible = false
            _this.$notify.error({
              title: '错误',
              message: res.message || '未知错误'
            });
          }
        })
      }
    },
    mounted(){
        this.$on('show', (auditStatus) => {
          this.auditStatus = auditStatus
          this.dialogTableVisible = true
        })
    },
    components: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-small {
  width: 200px
}
</style>
