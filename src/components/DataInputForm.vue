<template>
  <el-dialog
    :title="date + '营业数据'"
    :visible.sync="visible"
    width="60%"
    center>
    <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <el-table
        :data="data"
        height="400"
        border
        style="width: 100%">
        <el-table-column
          prop="time"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="data"
          label="数据"
         width="180">
        </el-table-column>
      </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name:"DataInputForm",
    props: {
      date: null,
      visible: false,
      data: [],
    }
  }
</script>

<style lang="less" scoped>
 ::v-deep .el-dialog{
  margin-top: 10vh !important;
}
</style>
