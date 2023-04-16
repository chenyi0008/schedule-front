<template>
  <div class="mainBox">
    <el-container class="fullScreen">
      <el-aside width="199px">
        <leftAside />
      </el-aside>
      <el-container>
        <el-container>
          <el-header>
            <ChoiceStore class="index" ref="store" />

            <p>员工后台管理系统</p>
          </el-header>
          <el-main>
            <!-- <div style="float: left"><shopSearchbutton></shopSearchbutton><shopSearchbutton></shopSearchbutton><el-button type="primary" icon="el-icon-search">搜索</el-button></div><div style="float: right"><shopButton></shopButton></div> -->
            <router-view />

            <!-- <div><tableView></tableview></div>   -->
            <!-- <div><paginAtion style="margin-top: 30px"></paginAtion></div> -->
          </el-main>
          <!-- <el-footer>地址</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import leftAside from "../components/leftAside.vue";
import ChoiceStore from "../components/ChoiceStore";

// import tableView from '../components/tableView.vue'
// import shopSearchbutton from '../components/shopSearchbutton.vue'
// import shopButton from '../components/shopButton.vue'
// import shopSearchbutton from '@/components/shopSearchbutton';

export default {
  name: "mainVue",
  data() {
    return {
      activePage: "门店信息",
    };
  },
  computed: {
    storeId() {
      return this.$refs.store.storeId;
    },
  },
  components: {
    leftAside,
    ChoiceStore,
    // tableView: tableView,
    // paginAtion: paginAtion,
    // shopSearchbutton: shopSearchbutton,
    // shopButton: shopButton
  },
  methods: {
    changeLabel(label) {
      this.activePage = label;
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #f9f9f9;
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
  background-color: #01182e;
  color: #333;
  text-align: center;
  line-height: 650px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 75px;
  height: 10px;
}

.index {
  float: right;
  
}


main {
  height: 100%;
}

// .background-picture {
//   background-image: url("../assets/img/background2.png");
//   background-size: cover;
// }
.background-picture {
  background-image: url("../assets/img/background2.png");
  background-size: cover;
}


</style>
