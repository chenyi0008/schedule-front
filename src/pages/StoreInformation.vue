
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
      title="新增门店"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="面积">
          <el-input v-model="form.area"></el-input>
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

    <!-- 对话框 -->
    <el-form
      :inline="true"
      :model="searchData"
      class="demo-form-inline"
    >
      <el-form-item label="请输入名称">
        <el-input
          v-model="searchData.name"
          placeholder="名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入地址">
        <el-input
          v-model="searchData.address"
          placeholder="地址"
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

    <!-- 桌面数据 -->
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

    <!-- 分页查询 -->
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
import { getAllStore, postStore } from "@/apis/store";
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
      searchData: {
        name: "",
        address: "",
      },
            //添加数据的对话框是否展示的标记
      dialogVisible: false,
      form: {
        name: "",
        address: "",
        area: "",
        id: null,
      },
      currentPage: 4,
    };
  },
  mounted() {
    //当页面加载完成后，发送异步请求
    var _this = this;
    getAllStore().then((res) => {
      console.log(res.data.data);
      _this.tableData = res.data.data;
      _this.searchData = res.data;
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //查询方法
    onSubmit() {
      console.log(this.searchData);
    },
    //提交新数据
    addTable() {
      // console.log(this.form)
      // 发送ajax请求，添加数据

      postStore(this.form).then((res) => {
        if (res.data.code == 1) {
          //添加成功
          console.log(res.data);
          this.$message.success(res.data.msg);
          this.dialogVisible = false;
          //关闭窗口
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 120px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
}
.el-button1 {
  width: 120px;
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