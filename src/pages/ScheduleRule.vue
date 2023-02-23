<template>
  <div>
    <el-form
      :inline="true"
      :model="searchData"
      class="demo-form-inline"
    >
      <el-form-item label="请输入排班规则">
        <el-input
          v-model="searchData.ruleType"
          placeholder="排班规则"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入数据">
        <el-input
          v-model="searchData.value"
          placeholder="数据"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="el-button1"
          type="primary"
          @click="onSubmit"
        >查询</el-button>
      </el-form-item>
    </el-form>
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
      ruletype: "",
      data: "",
      //搜索表单数据
      searchData: {
        ruleType: "",
        data: "",
      },
    };
  },
  components: {
    shopButton,
  },
  methods: {
    onSubmit() {
      console.log(this.searchData);
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
      this.searchData = res.data;
    });
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 150px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
}
.el-button1 {
  width: 150px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>