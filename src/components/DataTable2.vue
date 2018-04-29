<template>
  <div class="data-table">
    <div class="search-part">
      <slot name="conditions"></slot>
    </div>
    <div class="table-part">
      <el-table size="small" :data="rows" :row-class-name="tableRowClassName" :show-summary="showSummary" stripe :summary-method="getSummaries" border :empty-text="dataTable.emptyText||'暂无数据'" @selection-change="handleSelectionChange">
        <slot name="columns"></slot>
      </el-table>
    </div>
    <div class="pager-part">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes, prev, pager, next, jumper, total" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import ajax from '../utils/ajax'
// import serve from './serve'
export default {
  props: ['dataTable'],
  data() {
    return {
      page: 1,
      pageSize: 10,
      pageSizes: '[10, 20, 50, 100]',
      total: 0,
      rows: [],
      multipleSelection: [],
      test_class: 'timegreater120-row',
      handUpArr: [],
      listComplete: false,
      refreshI: 0,
      list_onoff: '',
    }
  },
  created: function() {
    // serve.$on('list-change',function(){
    //   console.log('ok');
    // });
    this.$on('refresh-data', function() {
      this.load();
    });
    this.$on('load-data', function() {
      this.page = 1;
      this.load();
    });
    this.$on('list-change', function() {
      console.log('ok');
    });
    this.pageSize = this.dataTable.pageSize || this.pageSize;
    this.pageSizes = this.dataTable.pageSizes || this.pageSizes;
    this.load();
  },
  computed: {
    showSummary: function() {
      return this.dataTable.showSummary || false;
    },
  },
  methods: {
    cancelWarning(id) {
      var _this = this;
      ajax({
        url: '/application/cancelWarning',
        type: "post",
        data: { id: id },
        dataType: 'json',
        contentType: this.dataTable.contentType || 'application/json',
        isFormData: this.dataTable.isFormData || false,
        success: function(response) {
          _this.$alert(`您进件ID为${id || '" "'}的进件挂起时间到达30min，需继续处理。`, '超时警报', {
            confirmButtonText: '确定',
            callback: _this.getHandUpList
          });
        },
        error: function(response) {
          let message = (response.message) ? response.message : "未知错误";
          _this.$notify({
            type: 'error',
            title: '错误',
            message: message
          });
          _this.getHandUpList();
          //var message = (response.message)? response.message : "未知错误";
        }
      });
    },
    testHandUpTime() {
      var _this = this;
      var key = this.list_onoff;
      var off = false;

      function eachList() {
        console.log('挂起组监控!');
        for (var i = 0; i < _this.handUpArr.length; i++) {
          var element = _this.handUpArr[i];
          var now = new Date();
          var record = element.handUpTime * 1000;
          var margin = Math.floor((now - record) / 60 / 1000);
          if (margin > 30) {
            if (element.status == 0) {
              _this.cancelWarning(element.loanId);
              off = true;
              return;
            }
          }
        }
      }
      eachList();
      var timer1 = setInterval(function() {
        if (_this.handUpArr.length < 1 || off == true || localStorage.list_onoff != key) {
          clearInterval(timer1);
          _this.refreshI = 0;
          return;
        }
        _this.refreshI += 1;
        eachList();
        if ((_this.refreshI % 60) == 0 && _this.listComplete) {
          console.log('接口刷新');
          _this.getList();
        }

      }, 1000);
    },
    tableRowClassName({ row, rowIndex }) {
      if (!row.handUpTime) {
        return '';
      }
      var now = new Date();
      var record = row.handUpTime * 1000;
      var margin = Math.floor((now - record) / 60 / 1000);
      if (margin < 30) {
        return 'timeless30-row';
      } else if (margin < 60) {
        return 'timeless60-row';
      } else if (margin < 120) {
        return 'timeless120-row';
      } else {
        return 'timegreater120-row';
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', this.multipleSelection);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.page = 1;
      this.load();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.load();
    },
    reload() {
      this.page = 1;
      this.load();
    },
    remittanceConfirmationReload() {
      this.load();
    },
    load() {
      this.getHandUpList();
      this.getList();
    },
    getHandUpList() {
      var self = this;
      self.list_onoff = new Date();
      localStorage.list_onoff = self.list_onoff;
      this.pageSize = this.pageSize || 10;
      var queryParams = {
        pageNum: this.page,
        pageSize: this.pageSize
      }
      Object.assign(queryParams, this.dataTable.queryParams);
      ajax({
        url: '/application/handUpList',
        type: "post",
        data: queryParams,
        dataType: 'json',
        contentType: this.dataTable.contentType || 'application/json',
        isFormData: this.dataTable.isFormData || false,
        success: function(response) {
          self.handUpArr = response.data.list;
          self.testHandUpTime();
        },
        error: function(response) {
          let message = (response.message) ? response.message : "未知错误";
          self.$notify({
            type: 'error',
            title: '错误',
            message: message
          });
          //var message = (response.message)? response.message : "未知错误";
        }
      });
    },

    getList() {
      if (!this.dataTable.url) return false;
      var self = this;
      this.pageSize = this.pageSize || 10;
      var queryParams = {
        pageNum: this.page,
        pageSize: this.pageSize
      }
      Object.assign(queryParams, this.dataTable.queryParams);
      self.listComplete = false;
      ajax({
        url: this.dataTable.url,
        type: "post",
        data: queryParams,
        dataType: 'json',
        contentType: this.dataTable.contentType || 'application/json',
        isFormData: this.dataTable.isFormData || false,
        success: function(response) {
          self.rows = response.data.list;
          self.rows = (self.rows) && self.rows.map(function(item, index) {
            item.pageIndex = (queryParams.pageNum - 1) * queryParams.pageSize + index + 1;
            return item;
          })
          self.total = response.data.recordsTotal;
          if (self.dataTable.type) {
            self.$emit(`transform-${self.dataTable.type}`, response);
          }
          self.listComplete = true;
        },
        error: function(response) {
          let message = (response.message) ? response.message : "未知错误";
          self.$notify({
            type: 'error',
            title: '错误',
            message: message
          });
          //var message = (response.message)? response.message : "未知错误";
        }
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          //                      sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },
  }
}

</script>
<style>
.el-table .timeless30-row td {
  background: #FFDAB9!important;
}

.el-table .timeless60-row td {
  background: #FF8247!important;
}

.el-table .timeless120-row td {
  background: #EE6363!important;
  color: #fff;
}

.el-table .timegreater120-row td {
  background: #B22222!important;
  color: #fff;
}

.data-table {
  width: 100%;
}

.data-table .pager-part {
  display: block;
  background-color: #eef1f6;
  padding: 5px;
  width: 100%;
  z-index: 99;
}

</style>
