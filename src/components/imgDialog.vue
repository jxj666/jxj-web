<template>
  <div class="">
    <el-dialog title="照片信息" :visible.sync="dialogTableVisible">
      <ul>
        <li v-for="(item, index) in userPhotos" :key="index" style="width:242px;display:inline-block;margin-right:10px">
          <el-card class="box-card" >
            <div class="">
            {{item.name}}   <span style="float: right; padding: 3px 0" @click="setRotate(index)"><i class="fa fa-refresh  fa-lg refresh"></i></span>
            </div>
            <transition name="fade">
              <img  :src="item.url" class="img-small enter" :style="{ transform:'rotate('+item.rotate+'deg)'}" @click="zoomImage(item.url)">
            </transition>
          </el-card>
        </li>
      </ul>
    </el-dialog>
    <el-dialog  :visible.sync="imgDialogVisible" width="80%">
            <div class="w_600 center">
                <img :src="showImg" alt="" class="mw_600">
            </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: [ 'userPhotos' ],
    data () {
      return {
        dialogTableVisible:false,
        imgDialogVisible: false,
        showImg : ''
      }
    },
    mounted(){
        this.$on('show', () => {
           this.dialogTableVisible = true
        })
    },
    methods: {
      setRotate (index) {
        let obj = Object.assign({},this.userPhotos[index],{rotate:this.userPhotos[index]['rotate']+90})
        this.$set(this.userPhotos,index,obj)
      },
      zoomImage (img) {
        this.imgDialogVisible = !this.imgDialogVisible
        this.showImg = img
      }
    },
    components: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-small {
  width: 200px;
  height:200px;
}
.mw_600{
      max-width: 800px;
      max-height:600px;
  }

  .center{
      text-align: center;
  }
.enter {
  transition: transform .5s
}
</style>
