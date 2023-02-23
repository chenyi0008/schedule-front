<template>
  <div>
    <div style="float:right">
    <el-input  placeholder="请输入规则类型" v-model="ruletype"></el-input><el-input  placeholder="请输入数据" v-model="data"></el-input>
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
        prop="ruleType"
        label="规则类型"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="value"
        label="数据"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template
          slot:scope
          float="right"
        >
          <template>
            <div>
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
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

 
<script>
import shopButton from "../components/shopButton.vue";

import { getAllRule } from "@/apis/rule";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      ruletype:'',
      data:'',
      
    };
  },
  components: {
    shopButton,
  },
  methods: {
    add:function() {
    this.tableData.push({
      ruletype:this.ruletype,
      data:this.data
    })
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
    getAllRule().then((res) => {
      console.log(res.data.data);
      this.tableData = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.el-input{
  width: 150px;
  margin-bottom:20px;
  margin-top:20px;
  margin-left:20px
}
</style>