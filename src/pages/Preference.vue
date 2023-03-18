<template>
  <div>
    <el-button
      class="mainButton"
      type="primary"
      plain
      @click="dialogVisible=true"
    >新增</el-button>

    <!-- 添加数据对话框表单 -->
    <el-dialog
      title="新增偏好"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="偏好类型">
          <el-input v-model="form.preferenceType"></el-input>
        </el-form-item>
        <el-form-item label="数据">
          <el-input v-model="form.value"></el-input>
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

    <!-- 编辑偏好详情模态框 -->
    <el-dialog
      :title="infoDialogTitle"
      :visible.sync="preferenceInfoDialogVisible"
    >
      <el-form :model="curruntPreference">
        <el-form-item
          v-if="infoDialogTitle != '新建偏好'"
          label="偏好类型"
          :label-width="formLabelWidth"

        >
          <el-input
            v-model="curruntPreference.preferenceType"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="数据"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="curruntPreference.value"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="preferenceInfoDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitPreferenceInfo"
        > 提 交 </el-button>
      </div>
    </el-dialog>

    <!-- 桌面表单 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-height: 490px"
      @selection-change="handleSelectionChange"
    >

      <el-table-column
        prop="preferenceType"
        label="偏好类型"
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
        prop="control"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="editPreference(scope.row)"
            type="primary"
            class="edit"
            plain
          >编辑</el-button>
          <el-button
            @click="deletePreference(scope.row.id)"
            type="danger"
            class="delete"
            plain
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

 
<script>
import shopButton from "../components/shopButton.vue";
import {
  getAllPreference,
  postPreference,
  deletePreference,
  putPreference,
} from "@/apis/preference";
export default {
  data() {
    return {
      preferenceId: -1,
      Preferences: [],
      preferenceMenbers: [],
      curruntPreferenceId: "",
      curruntPreference: {
        id: "",
        name: "",
      },
      PreferenceMenberDialogVisible: false,
      preferenceInfoDialogVisible: false,
      infoDialogTitle: "",
      formLabelWidth: "",
      tableData: [],
      //复选框选中的数据集合
      multipleSelection: [],
      preferencetype: "",
      value: "",
      //搜索表单数据
      searchData: {
        preferenceType: "",
        value: "",
        preferenceId: "",
        id: "",
      },
      //添加数据的对话框是否展示的标记
      dialogVisible: false,
      form: {
        preferenceType: "",
        value: "",
        id: null,
        preferenceId: "",
      },
      currentPage: 4,
    };
  },
  components: {
    shopButton,
  },
  // 挂载初始化
  mounted() {
    var _this = this;
    getAllPreference().then((res) => {
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
    //分页查询
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

    //添加数据
    addTable() {
      // console.log(this.form)
      // 发送ajax请求，添加数据

      postPreference(this.form).then((res) => {
        if (res.data.code == 1) {
          //添加成功
          this.$message.success(res.data.msg);
          this.dialogVisible = false;
          //关闭窗口
        }
      });
    },
    //完成删除
    deletePreference(schedulePreferenceid) {
      this.$confirm("此操作将永久删除小组，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePreference({ ids: schedulePreferenceid }).then((res) => {
            if (res.data.msg == "删除成功") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.tableData = res.data.data;
            } else throw new Error(res.data.msg);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    editPreference(preference) {
      this.infoDialohTitle = "偏好详情";
      this.curruntPreference = JSON.parse(JSON.stringify(preference));
      this.preferenceInfoDialogVisible = true;
    },
    submitPreferenceInfo() {
      if (this.infoDialogTitle === "新建小组") {
        postPreference({
          ...this.curruntPreference,
          preferenceId: this.tableData,
        })
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.preferenceInfoDialogVisible = false;
            this.tableData;
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: err,
              type: "error",
            });
          });
      } else {
        putPreference({ ...this.curruntPreference })
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.preferenceInfoDialogVisible = false;
            this.tableData;
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: err,
              type: "error",
            });
          });
      }
    },
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