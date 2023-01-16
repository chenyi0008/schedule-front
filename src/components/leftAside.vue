<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: 665px">
      <el-tab-pane label="门店信息" v-on:click="navigateTo('/mainVue')">门店信息</el-tab-pane>
      <el-tab-pane label="员工数据" v-on:click="navigateTo('/employeePreferences')">员工数据</el-tab-pane>
      <el-tab-pane label="预测数据" v-on:click="navigateTo('/forecastData')">预测数据</el-tab-pane>
      <el-tab-pane label="排班" v-on:click="navigateTo('/shiftScheduling')">排班</el-tab-pane>
      <el-tab-pane label="排班规则" v-on:click="navigateTo('/shiftschedulingRule')">排班规则</el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>

  export default {
  name: "leftAside",
  
  methods: {
    navigateTo(routes) {
      this.$router.push({name:routes}) 
    }
  },
  
  data() {
    return {
      tabPosition: "left",
    };
  },
};
</script>