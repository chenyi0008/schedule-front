<template>
  <div>
    <el-button
      class="dangerButton"
      type="danger"
      plain
    >批量删除</el-button>
    <el-button
      class="mainButton"
      type="primary"
      plain
      @click="dialogVisible=true"
    >新增</el-button>
    <!-- 添加数据对话框表单 -->
    <el-dialog
      title="新增规则"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="规则类型">
          <el-input v-model="form.dataType"></el-input>
        </el-form-item>
        <el-form-item label="数据">
          <el-input v-model="form.data"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="addTable()"
          >提交</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 对话框表单 -->
    <el-form
      :inline="true"
      :model="searchData"
      class="demo-form-inline"
    >
      <el-form-item label="请输入排班规则">
        <el-input
          class="el-input1"
          v-model="searchData.ruleType"
          placeholder="排班规则"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入数据">
        <el-input
          class="el-input1"
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

    <!-- 桌面表单 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-height: 490px"
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

    <!-- 分页工具条 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,4,6]"
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
    >
    </el-pagination>
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
      //添加数据的对话框是否展示的标记
      dialogVisible: false,
      form: {
        dataType: "",
        data: "",
      },
      currentPage: 4,
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
    //分页查询
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    //添加数据
    addTable() {
      console.log(this.form);
    },
  },

  // 挂载初始化
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
.el-input1 {
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
.dangerButton {
  float: left;
  width: 120px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
}

.mainButton {
  float: left;
  width: 120px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>