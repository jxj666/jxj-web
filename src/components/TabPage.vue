<template>
  <div class="tab-page">
    <el-tabs
      type="border-card"
      v-model="activeName"
      @tab-click="handleClick"
      @tab-remove="handleRemove">
      <el-tab-pane
        v-for="item in pages"
        :label="item.label"
        :name="item.name"
        :key="item.label"
        :closable="item.closable">
        <slot :name="item.slotName"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default{
    props: [ 'type'],  //type:标记父页面
    data(){
      return{
        activeName: 'default',
        pages: [],
        length:0,
        tabPage:{},
        index:0,
      }
    },
    mounted() {
      this.$on('open-tab', function(tabPage){
        this.openTabPage(tabPage);
      });
      this.$on('handle-remove', function(detail){
        this.handleRemove(detail);
      });
    },

    methods: {
      // handleRemove(tab) {
      //     this.closeLinkPage(tab);
      // },
      handleClick(tab, event) {
        console.log(tab, event);
        console.log(tab.name, tab.label);
      },
      //var defaultPage = {label:"进件详情", name: "detail", slotName: 'detail', parentName:'application', closable: true};
      openTabPage(tabPage){
        var _this=this;
        if(this.pages.some((item,key )=> {
            if(tabPage.name == item.name){
              return true;
            }
          })){
          var pageIndex = -1;
          this.pages.forEach((item, index) => {
            if(item.name == tabPage.name){
              pageIndex = index;
            }
          });
          if(pageIndex >= 0){
            this.pages.splice(pageIndex, 1);
            this.handleRemove(tabPage.name);
          }
          setTimeout(()=>{
            this.pages.push(tabPage);
            this.activeName = tabPage.name;
          })
        }
        else{
          this.pages.push(tabPage);
          this.activeName = tabPage.name;
        }
      },
      handleRemove(targetName) {
        console.log(targetName)
        let tabs = this.pages;
        let activeName = this.activeName;
        let closeTabs = tabs.filter((tab) => {
          return tab.name === targetName || tab.parentName === targetName;
        })


        // 如果当前activeName在将要关闭的标签里面, 需要设置关闭后下一个active的tab
        let closestTabName = activeName;
        if(closeTabs.some(tab => (tab.name === activeName))){
          for(let item of tabs){
            if(item.name === activeName) break;
            if(closeTabs.every(tab => (tab.name !== item.name))) {
              closestTabName = item.name;
            }
          }
        }
        this.activeName = closestTabName;
        this.pages = tabs.filter((tab) => {
          // 关闭本标签页和它的子级标签页
          return tab.name !== targetName && tab.parentName !== targetName;
        });
      }
    }
  }
</script>

<style scoped>
  .tab-page, .el-tabs {
    height:100%;
  }
  .el-tabs--border-card {
    border: none;
    box-shadow: none;
  }
</style>
