<template>
  <tab-page ref="tabPage">
    <template slot="actualTimeAudit">
      <data-table :data-table="dataTable" ref="dataTable">
        <div slot="conditions" >
          <el-form :inline="true" :model="queryParams">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" size="small" style="margin-top:0">刷新
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
          <el-table-column sortable prop="applicationTotal" label="进件总量/件" ></el-table-column>
          <el-table-column sortable prop="applicationAudit" label="待人工审核总数/件" ></el-table-column>
          <el-table-column sortable prop="applicationTerminal" label="已处理总量/件" ></el-table-column>
          <el-table-column sortable prop="applicationApprove" label="通过总量/件"></el-table-column>
          <el-table-column sortable prop="applicationReject" label="拒绝总量/件"></el-table-column>
          <el-table-column sortable prop="applicationTodayTotal" label="今日进件/件"></el-table-column>
          <el-table-column sortable prop="applicationTodayAudit" label="今日待人工审核/件"></el-table-column>
          <el-table-column sortable prop="applicationTodayTerminal" label="今日已处理/件"></el-table-column>
          <el-table-column sortable prop="applicationTodayApprove" label="今日通过/件"></el-table-column>
          <el-table-column sortable prop="applicationRejectApprove" label="今日拒绝/件"></el-table-column>
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
        },
        dataTable: {
          pageSize: 50,
          pageSizes: [10, 20, 50, 100, 1000],
          url: '/statistics/audit/immediate',
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

      var defaultPage = {label: " 实时审核情况统计", name: "actualTimeAudit", slotName: 'actualTimeAudit', closable: false};
      this.$refs.tabPage.$emit("open-tab", defaultPage);

    },
    methods: {

      loadLists(){
        this.$refs.dataTable.$emit('load-data');
      },
      onSubmit: function () {
        this.dataTable.queryParams = this.queryParams;
        var tag = this.warnTime(this.dataTable.queryParams.beginTime, this.dataTable.queryParams.endTime);
        if (tag) {
          return;
        }
        this.dataTable.queryParams.beginTime = this.dealDate(this.dataTable.queryParams.beginTime) + ' 00:00:00';
        this.dataTable.queryParams.endTime = this.dealDate(this.dataTable.queryParams.endTime) + ' 23:59:59';
        this.dataTable.url = '/statistics/audit/immediate';
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
            '进件总量/件',
            '待人工审核总数/件',
            '已处理总量/件',
            '通过总量/件',
            '拒绝总量/件',
            '今日进件/件',
            '今日待人工审核/件',
            '今日已处理/件',
            '今日拒绝/件',
            '今日通过/件',

          ];
          const filterVal = [
            'date',
            'applicationTotal',
            'applicationAudit',
            'applicationTerminal',
            'applicationApprove',
            'applicationReject',
            'applicationTodayTotal',
            'applicationTodayAudit',
            'applicationTodayTerminal',
            'applicationRejectApprove',
            'applicationTodayApprove',
          ];
          const list = this.$refs.dataTable.rows;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '实时审核情况统计');
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
