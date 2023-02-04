<template>
  <el-dialog
    :title="dateString + '营业数据'"
    :visible.sync="visible"
    width="60%"
    center
  >
    <!-- <span>需要注意的是内容是默认不居中的</span> -->
    <el-table
      :data="data"
      :row-class-name="rowClassName"
      height="400"
      border
      style="width: 100%"
    >
      <el-table-column prop="time" label="时间" width="180"> </el-table-column>
      <el-table-column prop="data" label="数据" width="180"> </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false"
        >保 存</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DataInputForm",
  data() {
    return {
      visible: false,
    };
  },
  props: {
    date: {
      type: Date,
      require: true,
    },
    data: [],
  },
  methods: {
    rowClassName({ row, index }) {
      row.time = index;
    },
    show() {
      this.visible = true;
    },
  },
  computed: {
    dateString() {
      // console.log(this.date);
      return (
        this.date.getFullYear() +
        "年" +
        (this.date.getMonth() + 1) +
        "月" +
        this.date.getDate() +
        "日"
      );
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-dialog {
  margin-top: 10vh !important;
}
</style>
