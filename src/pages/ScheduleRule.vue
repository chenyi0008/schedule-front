<template>
  <div>
    <div style="float: left"><shopSearchbutton></shopSearchbutton><el-button type="primary" icon="el-icon-search">搜索</el-button></div><div style="float: right"><shopButton></shopButton></div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-height: 480px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="200px"> </el-table-column>
      <el-table-column label="日期" width="200px">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>

      <el-table-column prop="address" label="地址" width="400px">
      </el-table-column>
      <el-table-column label="操作" width="400px">
        <template slot:scope float="right">
          <template>
            <div>
              <el-button type="primary" class="edit" plain>编辑</el-button>
              <el-button type="danger"  class="delete" plain>删除</el-button>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

 
<script>
import shopButton from '../components/shopButton.vue'
import shopSearchbutton from '@/components/shopSearchbutton';
import {getAllRule} from '@/apis/rule'
export default {

  data() {
    return {
      tableData: [
      ],
      multipleSelection: [],
    };
  },
  components:{
shopSearchbutton,
shopButton
  },
  methods: {
    addRow() {
      console.log("添加操作");
    },
    editRow() {
      console.log("编辑操作");
    },
    deleteRow() {
      console.log("删除操作");
    },
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

  mounted() {
    getAllRule().then(res=>{
      console.log(res.data.data);
      this.tableData = res.data.data;
    })
  }

};
</script>

<style>

</style>