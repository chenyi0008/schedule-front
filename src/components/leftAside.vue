<template>
  <div>
    <el-tabs
      :tab-position="tabPosition"
      @tab-click="changeNav"
      :value="activeTab"
      style="height: 665px"
    >
      <el-tab-pane label="门店信息" name="store">门店信息</el-tab-pane>
      <el-tab-pane label="员工数据" name="employee">员工数据</el-tab-pane>
      <el-tab-pane label="员工分组" name="group">员工分组</el-tab-pane>
      <el-tab-pane label="预测数据" name="forecastData">预测数据</el-tab-pane>
      <el-tab-pane label="排班" name="schedule">排班</el-tab-pane>
      <el-tab-pane label="排班规则" name="rule">排班规则</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "leftAside",

  methods: {
    changeNav(pane) {
      this.$emit("changeNav", pane.label);
      // console.log(pane.label)
      this.$router.push({ name: pane.name });
    },
  },

  data() {
    return {
      activeTab: "store",
      tabPosition: "left",
    };
  },
};
</script>

<style scoped>
::v-deep .el-tabs__header.is-left {
  width: 100%;
}
::v-deep .el-tabs__content {
  display: none;
  max-width: 0px;
}
</style>
