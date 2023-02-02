<template>
  <div>
    <div style="float: left"><shopSearchbutton></shopSearchbutton><shopSearchbutton></shopSearchbutton><el-button type="primary" icon="el-icon-search">搜索</el-button></div><div style="float: right"><shopButton></shopButton></div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-height: 480px"
      @selection-change="handleSelectionChange"
    >
   
      <el-table-column type="selection" width="200px"> </el-table-column>
      <!-- <el-table-column label="商店id" width="120"> -->
      <!--   <template v-slot="scope">{{ scope.row.id}}</template> -->
      <!-- </el-table-column> -->
      <el-table-column prop="name" label="名称" width="200px"> </el-table-column>
      <el-table-column prop="address" label="地址" width="200px"></el-table-column>
      <el-table-column prop="size" label="面积" width="200px"></el-table-column>
      <el-table-column prop="control" label="操作" width="200px">
      <template>
        <div>
          <el-button type="primary" class="edit" plain>编辑</el-button>
              <el-button type="danger"  class="delete" plain>删除</el-button>
        </div>
        </template>

      </el-table-column>
      </el-table>

  </div> 
</template>
 
<script>
import shopButton from '../components/shopButton.vue'
import shopSearchbutton from '@/components/shopSearchbutton';
import {getAllStore} from '@/apis/store'
export default {
  name: "tableView",
  components: {
shopButton,
shopSearchbutton
  },
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

<style lang="less" scoped>

</style>