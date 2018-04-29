<template>
  <tab-page ref="tabPage">
    <div class="home-container">
      <div class="home-contents">
        <h2><i class="fa fa-exclamation-circle"></i> 很抱歉, 您访问的页面不存在!</h2>
      </div>
    </div>
  </tab-page>
</template>
<script>
  import TabPage from "../../components/TabPage"

  export default {
    data() {
      return {
      }
    },
    mounted() {
      var defaultPage = {label:"页面不存在", name: "default", closable: false, slotName: 'default'};
      this.$refs.tabPage.openTabPage(defaultPage);
    },
    components: {
      TabPage
    }
  }

</script>

<style scoped>
  .home-container {
    width: 100%;
    height: 600px;
  }
  .home-contents {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

</style>
