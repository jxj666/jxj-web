<template>
  <tab-page ref="tabPage">
    <template slot="test">
    </template>
  </tab-page>
</template>

<script>
  import TabPage from "@/components/TabPage"
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      var defaultPage = {label:"test", name: "test", slotName: 'test', closable: false};
      this.$refs.tabPage.$emit('open-tab',defaultPage);
    },
    components: {
      TabPage
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
