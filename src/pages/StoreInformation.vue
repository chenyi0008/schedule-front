<template>
  <div>
  <div style="float:right">
    <el-input  placeholder="请输入名称" v-model="name"></el-input><el-input  placeholder="请输入地址" v-model="address"></el-input><el-input placeholder="请输入面积" v-model="area"></el-input>
  <shopButton @click="add()" style="margin-left:20px;"></shopButton>
  </div>
    
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-height: 480px"
      @selection-change="handleSelectionChange"
    >

      <el-table-column
        type="selection"
      align="center"
      > </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="address"
        label="地址"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="size"
        label="面积"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="control"
        label="操作"
        align="center"
      >
        <el-button
          type="primary"
          class="edit"
          plain
        >编辑</el-button>
        <el-button
          type="danger"
          class="delete"
          plain
        >删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import shopButton from "../components/shopButton.vue";
import { getAllStore } from "@/apis/store";
export default {
  name: "tableView",
  components: {
    shopButton,
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      name:'',
      address:'',
      area:''
    };

  },
  mounted() {
    getAllStore().then((res) => {
      console.log(res.data.data);
      this.tableData = res.data.data;
    });
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
    add:function(){
    this.tableData.push({
      name:this.name,
      address:this.address,
      area:this.area
    })
    }
  },
};
</script>

<style lang="less" scoped>
.el-input{
  width: 120px;
  margin-bottom:20px;
  margin-top:20px;
  margin-left:20px
}
</style> 