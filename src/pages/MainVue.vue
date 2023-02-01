<template>
  <div class="mainBox">
    <el-container class="fullScreen">
      <el-header>
          <ChoiceStore class="index"  ref="store"/>
        <div>
          智能排班--
          {{activePage}}       
          </div>
 
      </el-header>
      <el-container>
        <el-aside width="100px"><leftAside @changeNav="changeLabel"/></el-aside>
        <el-container>
          <el-main>
            <div style="float: left"><shopSearchbutton></shopSearchbutton></div><div style="float: right"><shopButton></shopButton></div>
            <router-view/>

            <!-- <div><tableView></tableview></div>   -->
              <div><paginAtion style="margin-top:40px" ></paginAtion></div>
          </el-main>
          <!-- <el-footer>地址</el-footer> -->

        </el-container>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import leftAside from '../components/leftAside.vue'
import ChoiceStore from '../components/ChoiceStore'
// import tableView from '../components/tableView.vue'
import paginAtion from '../components/paginAtion.vue'
// import shopSearchbutton from '../components/shopSearchbutton.vue'
import shopButton from '../components/shopButton.vue'
import shopSearchbutton from '@/components/shopSearchbutton';

export default {
  name: 'mainVue',
  data(){
    return{
      activePage: "门店信息",
    }
  },
  computed: {
    storeId(){
      // console.log(this.$refs.store.storeId)
      return this.$refs.store.storeId;
    }
  },
  components: {
    leftAside,
    ChoiceStore,
    // tableView: tableView,
    paginAtion:paginAtion,
    shopSearchbutton: shopSearchbutton,
    shopButton: shopButton
  },
  methods: {
    changeLabel(label){
      // console.log(label);
      this.activePage = label;
    }
  },



};
</script>

<style lang="less">
 .el-header{
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}


.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 650px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 75px;
}

.index {
  float: right;
}

</style> 

