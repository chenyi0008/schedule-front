<template>
  <div>
    <el-container>
     <el-header>智能排班</el-header>
      <el-container>
        <el-aside width="200px"><div><leftAside></leftAside></div></el-aside>
        <el-container>
          <el-main>
            <div><shopSearchbutton></shopSearchbutton><shopButton></shopButton></div>
            <div><tableView></tableview></div>
            
            </el-main>
          <el-footer>地址</el-footer>
          <div><paginAtion></paginAtion></div>
        </el-container>
      </el-container>
    </el-container>
  </div>

</template>

<style>
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

</style> 

<script>
import leftAside from './leftAside.vue'
import tableView from './tableView.vue'
import paginAtion from './paginAtion.vue'
import shopSearchbutton from './shopSearchbutton.vue'
import shopButton from './shopButton.vue'

export default {
  name: 'mainVue',
  components: {leftAside, tableView: tableView,paginAtion:paginAtion,shopSearchbutton: shopSearchbutton,shopButton: shopButton}



};
</script>  