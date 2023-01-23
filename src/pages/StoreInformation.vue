<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="商店id" width="120">
        <template v-slot="scope">{{ scope.row.id}}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="size" label="面积" show-overflow-tooltip></el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import {getAllStore} from '@/apis/store'
export default {
  name: "tableView",
  data() {
    return {
      tableData: [
      ],
      multipleSelection: [],
    };
  },
  mounted() {
    getAllStore().then(res=>{
      console.log(res.data.data);
      this.tableData = res.data.data;
    })
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="less" scoped></style>
