<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="请输入名称">
        <el-input
          v-model="formInline.user"
          placeholder="名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入地址">
        <el-input
          v-model="formInline.user"
          placeholder="地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入面积">
        <el-input
          v-model="formInline.user"
          placeholder="面积"
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
      //表格数据
      tableData: [],
      //复选框选中数据集合
      multipleSelection: [],
      name: "",
      address: "",
      area: "",
      //搜索表单数据
      formInline: {
          user: '',
          region: ''
        }
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
    onSubmit() {
        console.log('submit!');
      }
  },
};
</script>

<style lang="less" scoped>
.el-input{
  width: 120px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
}
.el-button1{
  width: 120px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
}
</style> 