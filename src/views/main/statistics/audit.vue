<template>
    <tab-page ref="tabPage">
      <template slot="audit">
        <data-table :data-table="dataTable" ref="dataTable">
          <div slot="conditions" >
            <el-form :inline="true" :model="queryParams">
              <el-form-item>
                <div style="display: inline-block; vertical-align: middle;">结件时间</div>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="queryParams.beginTime"
                  type="date"
                  placeholder="选择日期时间" size="small" style="width:170px">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <div style="display: inline-block; vertical-align: middle;">至</div>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="queryParams.endTime"
                  type="date"
                  placeholder="选择日期时间" size="small" style="width:170px">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" size="small" style="margin-top:0">查询
                </el-button>
              </el-form-item>
              <el-form-item class="right">
                <el-button  type="primary" size="small"
                           @click="exportExcel"><i class="fa fa-download"></i>&nbsp;导出excel
                </el-button>
              </el-form-item>
            </el-form>

          </div>
          <template slot="columns">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column sortable prop="date" label="日期" width="100"></el-table-column>
            <el-table-column sortable prop="applicationTotal" label="审核总量/件" ></el-table-column>
            <el-table-column sortable prop="applicationApprove" label="审核通过/件" ></el-table-column>
            <el-table-column sortable prop="applicationReject" label="审核拒绝/件"></el-table-column>
            <el-table-column sortable prop="time" label="平均审核时效/min"></el-table-column>
            <el-table-column sortable prop="applicationAmountAvg" label="件均金额/元"></el-table-column>
          </template>
        </data-table>
      </template>
    </tab-page>
</template>
<style scoped>

</style>
<script>
  import ajax from '../../../utils/ajax'
  import formatDate from '../../../utils/dateFormat'
  import DataTable from "../../../components/DataTable"
  import TabPage from "../../../components/TabPage"

  export default{
    components: {
      DataTable,
      TabPage,
    },
    data(){
      return {
        initBeginTime: '',
        initEndTime: '',
        queryParams: {
          startTime: '',
          endTime: '',
        },
        dataTable: {
          pageSize: 50,
          pageSizes: [10, 20, 50, 100, 1000],
          url: '/statistics/audit/report',
          emptyText: '没有记录',
          showSummary: true,
          isFormData: true,
          contentType: 'application/x-www-form-urlencoded;',
        },
      }
    },
    mounted(){
      this.dataTable.queryParams = this.queryParams;
      let date = new Date();
      let beginDate = new Date(date.setDate(date.getDate() - 7));
      this.initBeginTime = this.dealDate(beginDate);
      this.initEndTime = this.dealDate(new Date());
      this.dataTable.queryParams.beginTime = this.initBeginTime + ' 00:00:00';
      this.dataTable.queryParams.endTime = this.initEndTime + ' 23:59:59';

      var defaultPage = {label: "审核情况统计", name: "audit", slotName: 'audit', closable: false};
      this.$refs.tabPage.$emit("open-tab", defaultPage);

    },
    methods: {

      loadLists(){
        this.$refs.dataTable.$emit('load-data');
      },
      onSubmit: function () {
        this.dataTable.queryParams = this.queryParams;
        var tag = this.warnTime(this.dataTable.queryParams.startTime, this.dataTable.queryParams.endTime);
        if (tag) {
          return;
        }
        //console.log(Object.prototype.toString.call(this.dataTable.queryParams.beginTime));
        this.dataTable.queryParams.startTime = this.dealDate(this.dataTable.queryParams.startTime) ;//+ ' 00:00:00';
        this.dataTable.queryParams.endTime = this.dealDate(this.dataTable.queryParams.endTime) ;//+ ' 23:59:59';
        this.dataTable.url = '/statistics/audit/report';
        this.$refs.dataTable.$emit('load-data');
      },
      warnTime(startTime, endTime){
        if (!startTime) {
          this.$notify({
            message: '查询开始时间不能为空！',
            type: 'warning'
          });
          return true;
        }
        if (!endTime) {
          this.$notify({
            message: '查询结束时间不能为空！',
            type: 'warning'
          });
          return true;
        }
        let timeStart = new Date(startTime).getTime();
        let timeEnd = new Date(endTime).getTime();
        if (timeStart > timeEnd) {
          this.$notify({
            message: '查询开始时间不能大于结束时间',
            type: 'warning'
          });
          return true;
        }
        return false;
      },
      dealTime(time){
        return formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss');
      },
      dealDate(date){
        return formatDate(new Date(date), 'yyyy-MM-dd');
      },
      formatterDate(row, column){
        return formatDate(row.date, 'yyyy-MM-dd');
      },

      exportExcel() {
        require.ensure([], () => {
          const {export_json_to_excel} = require('vendor/Export2Excel');
          const tHeader = [
          	'日期',
            '审核总量/件',
            '审核通过/件',
            '审核拒绝/件',
            '平均审核时效/min',
            '件均金额/元'
          ];
          const filterVal = [
          	'date',
            'applicationTotal',
            'applicationApprove',
            'applicationReject',
            'time',
            'applicationAmountAvg',
          ];
          const list = this.$refs.dataTable.rows;
          console.log('list:',list);
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '审核情况统计');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          let returnValue;
          if (j == 'operator') {
            returnValue = v[j].name;
          } else {
            returnValue = v[j];
          }
          return returnValue;
        }))
      },

    },
  }
</script>
