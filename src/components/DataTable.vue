<template>
  <div class="data-table">
    <div class="search-part">
      <slot name="conditions"></slot>
    </div>

    <div class="table-part">
      <el-table size="small" :data="rows" :show-summary="showSummary" stripe :summary-method="getSummaries" border :empty-text="dataTable.emptyText||'暂无数据'" @selection-change="handleSelectionChange">
        <slot name="columns"></slot>
      </el-table>
    </div>

    <div class="pager-part">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="sizes, prev, pager, next, jumper, total"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import ajax from '../utils/ajax'
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
        test_class:'timegreater120-row',
      }
    },
    created: function () {
      this.$on('refresh-data', function(){
        this.load();
      });
      this.$on('load-data', function(){
        this.page = 1;
        this.load();
      });
      this.pageSize = this.dataTable.pageSize || this.pageSize;
      this.pageSizes = this.dataTable.pageSizes || this.pageSizes;
      this.load();
    },
    computed:{
      showSummary: function () {
          return this.dataTable.showSummary || false;
      },
    },
    methods: {      
      // tableRowClassName({row, rowIndex}) {
      //   if (rowIndex === 0) {
      //     return 'timeless30-row';
      //   }
      //   else if(rowIndex === 1){
      //     return 'timeless60-row';
      //   }
      //   else if(rowIndex === 2){
      //      return 'timeless120-row';     
      //   }
      //   else if (rowIndex === 3) {
      //     return 'timegreater120-row';
      //   }
      //   return '';
      // },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit('handleSelectionChange',this.multipleSelection);
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
      remittanceConfirmationReload(){
        this.load();
      },
      load() {
        if(!this.dataTable.url) return false;
        var self = this;
        this.pageSize = this.pageSize || 10;
        var queryParams = {
          pageNum: this.page,
          pageSize: this.pageSize
        }
        Object.assign(queryParams, this.dataTable.queryParams);
        ajax({
          url: this.dataTable.url,
          type: "post",
          data: queryParams,
          dataType:'json',
          contentType: this.dataTable.contentType || 'application/json',
          isFormData: this.dataTable.isFormData || false,
          success: function(response) {
            self.rows = response.data.list;
            self.rows =(self.rows)&&self.rows.map(function (item, index) {
              item.pageIndex = (queryParams.pageNum - 1) * queryParams.pageSize + index + 1;
              return item;
            })
            self.total = response.data.recordsTotal;
            if(self.dataTable.type){
              self.$emit(`transform-${self.dataTable.type}`,response);
            }
          },
          error: function(response){
            let message = (response.message) ? response.message : "未知错误";
            self.$notify({
              type:'error',
              title: '错误',
              message: message
            });
            //var message = (response.message)? response.message : "未知错误";
          }
        });
      },
      getSummaries(param) {
        const {columns, data} = param;
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
  .el-table .timeless30-row  td{
    background: #FFDAB9!important;
  }

  .el-table .timeless60-row  td{
    background: #FF8247!important;
  }
    .el-table .timeless120-row  td{
    background: #EE6363!important;
    color: #fff;
  }
    .el-table .timegreater120-row  td{
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
    width:100%;
    z-index: 99;
  }
</style>
