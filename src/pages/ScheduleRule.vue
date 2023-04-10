<template>
  <div>
    <el-button
      class="mainButton"
      type="primary"
      plain
      @click="dialogVisible = true"
    >新增普通规则</el-button>

    <el-button
      class="mainButton"
      type="primary"
      plain
      @click="anotherdialogVisible = true"
    >新增职位规则</el-button>

    <!-- 添加普通规则对话框表单 -->
    <el-dialog
      title="普通规则"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <template>
          <el-form-item label="规则类型">
            <el-select
              @change="ruleTypeChange"
              v-model="form.ruleType"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>

        <el-form-item label="数据">
          <el-input v-model="form.value"></el-input>
        </el-form-item>

        <template>
          <div>
            <el-card class="box-card">
              <p>
                {{ this.p }}
              </p>
            </el-card>
          </div>
        </template>
        <el-form-item>
          <el-button
            type="text"
            @click="open"
          >提交预览</el-button>
          <el-button
            type="primary"
            @click="addTable()"
          >提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加职位规则对话框表单 -->
    <el-dialog
      title="新增职位规则"
      :visible.sync="anotherdialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <template>
          <el-form-item label="职业规则">
            <el-input
              v-model="input"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </template>

        <template>
          <div style="width: 100%">
            开店人员
            <el-select
              v-model="value1"
              multiple
              placeholder="请选择"
              style="width: 77%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </template>

        <template>
          <div style="width: 100%">
            值班人员
            <el-select
              @change="ruleChange()"
              v-model="value2"
              multiple
              placeholder="请选择"
              style="width: 77%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </template>

        <template>
          <div style="width: 100%">
            关店人员
            <el-select
              v-model="value3"
              multiple
              placeholder="请选择"
              style="width: 77%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </template>
        <template>
          <el-card class="box-card">
            <div>
              <p>提示:用户可自定义设置指定类型的班次由指定职位的员工进行值班，用户未设置则默认为所有类型的班次没有限定职位。</p>
            </div>
          </el-card>
        </template>
        <el-form-item>
          <el-button
            type="text"
            @click="open"
          >提交预览</el-button>
          <el-button
            type="primary"
            @click="addPostionRule()"
          >提交</el-button>
          <el-button @click="anotherdialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑小组详情模态框 -->
    <el-dialog
      :title="infoDialogTitle"
      :visible.sync="ruleInfoDialogVisible"
    >
      <el-form :model="curruntRule">
        <el-form-item
          v-if="infoDialogTitle != '新建小组'"
          label="规则类型"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="curruntRule.ruleType"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="规则"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="curruntRule.value"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="ruleInfoDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitRuleInfo"
        >
          提 交
        </el-button>
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
        prop="ruleType"
        label="规则类型"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="规则"
        align="center"
      >
        <template slot-scope="scope">
          {{ analysis(scope.row.ruleType, scope.row.value) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="control"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="editRule(scope.row)"
            type="primary"
            class="edit"
            plain
          >编辑</el-button>
          <el-button
            @click="deleteRule(scope.row.id)"
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
import { postRule, deleteRule, putRule, getRuleById } from "@/apis/rule";
export default {
  data() {
    return {
      p: "",
      storeId: -1,
      input: "职位规则",
      Rules: [],
      ruleMenbers: [],
      curruntRuleId: "",
      curruntRule: {
        id: "",
        name: "",
      },
      RuleMenberDialogVisible: false,
      ruleInfoDialogVisible: false,
      infoDialogTitle: "",
      formLabelWidth: "",
      //表格数据
      tableData: [],
      //复选框选中的数据集合
      multipleSelection: [],
      ruleType: "",
      value: "",
      //搜索表单数据
      searchData: {
        ruleType: "",
        value: "",
        storeId: "",
        id: null,
      },

      params: {
        ruleType: "",
        value: "",
        storeId: 1,
        id: null,
      },
      //添加数据的对话框是否展示的标记
      dialogVisible: false,
      //添加另外一个数据的对话框是否展示的标记
      anotherdialogVisible: false,

      form: {
        ruleType: "",
        value: "",
        id: null,
        storeId: 1,
      },

      positionRuleValue: "",

      options1: [
        {
          value: "开店规则",
          label: "开店规则",
        },
        {
          value: "关店规则",
          label: "关店规则",
        },
        {
          value: "客流规则",
          label: "客流规则",
        },
        {
          value: "值班规则",
          label: "值班规则",
        },
        {
          value: "休息规则",
          label: "休息规则",
        },
      ],
      value: "",

      options: [
        {
          value: "店长",
          label: "店长",
        },
        {
          value: "副店长",
          label: "副店长",
        },
        {
          value: "经理",
          label: "经理",
        },
        {
          value: "副经理",
          label: "副经理",
        },
        {
          value: "导购员",
          label: "导购员",
        },
        {
          value: "收银员",
          label: "收银员",
        },
        {
          value: "店员",
          label: "店员",
        },
      ],
      value1: [],
      value2: [],
      value3: [],
      currentPage: 4,
    };
  },
  components: {
    shopButton,
  },
  // 挂载初始化
  mounted() {},
  watch: {
    "$store.state.storeId": {
      handler(val) {
        this.storeId = val;
        console.log(this.storeId);
        this.getRules(val);
        this.form.storeId = val;
        this.params.storeId = val;
        console.log(val);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getRules(storeId) {
      getRuleById({ storeId: storeId }).then((res) => {
        this.tableData = res.data.data;
        console.log(res.data);
        this.searchData = res.data;
      });
    },

    ruleTypeChange(val) {
      console.log(val);
      switch (val) {
        case "开店规则":
          this.p = `例子:输入1.5,23.5表示开店\n1.5\n个小时前需要有员工当值，当值员工数为门店面积/\n23.5\n`;
          break;
        case "关店规则":
          this.p = `例子:输入8表示关店\n3\n个小时内需要有\n8\n名员工当值`;
          break;
        case "客流规则":
          this.p = `例子:输入8表示每 \n4\n 个客流，至少需要有\n8\n个员工当值`;
          break;
        case "值班规则":
          this.p = `例子:输入8表示没有客流量的时候，需要有\n8\n个员工当值`;
          break;
        case "休息规则":
          this.p = `例子:输入8表示员工每连续工作\n4\n个小时后需要休息\n8\n个小时`;
          break;
      }
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //查询方法
    onSubmit() {
      console.log(this.searchData);
    },
    //添加方法
    addPostionRule() {
      const s1 = this.value1.join(",");
      const s2 = this.value2.join(",");
      const s3 = this.value3.join(",");
      this.params.value = `开店:${s1}|  值班:${s2}|  关店:${s3}`;
      this.positionRuleValue = this.params.value;
      console.log(this.params);
      postRule(this.params).then((res) => {
        if (res.data.code == 1) {
          //添加成功
          this.$message.success(res.data.msg);
          this.anotherdialogVisible = false;
          //隐藏对话框..
          location.reload(); // Refresh the current page
        }
      });
    },

    analysis(ruleType, value) {
      const strSlice = value.split(",");
      const arr = new Array(10).fill(0);

      for (let idx = 0; idx < strSlice.length; idx++) {
        arr[idx] = parseFloat(strSlice[idx]);
      }
      switch (ruleType) {
        case "开店规则":
          return `开店\n${arr[0].toFixed(
            1
          )}\n个小时前需要有员工当值，当值员工数为门店面积/${arr[1].toFixed(
            2
          )}\n`;
        case "关店规则":
          return `关店\n${arr[0].toFixed(1)}\n个小时内需要有\n${(
            arr[1] + arr[2]
          ).toFixed(0)}\n名员工当值`;

        case "客流规则":
          return `每 \n4\n 个客流，至少需要有${arr[0].toFixed(0)}个员工当值`;

        case "职位规则":
          return `${value}`;

        case "值班规则":
          return `没有客流量的时候，需要有\n${arr[0].toFixed(0)}\n个员工当值`;
        case "休息规则":
          return `表示员工每连续工作\n4\n个小时后需要休息\n${arr[0].toFixed(
            0
          )}\n个小时`;
      }
      return "返回错误";
    },

    open() {
      this.$alert(
        this.analysis(this.form.ruleType, this.form.value),
        "预提交以下内容",
        {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        }
      );

      // console.log(this.ruleType, ...value);
    },

    //添加数据
    addTable() {
      // console.log(this.form)
      // 发送ajax请求，添加数据
      postRule(this.form).then((res) => {
        if (res.data.code == 1) {
          //添加成功
          this.$message.success(res.data.msg);
          this.dialogVisible = false;
          //关闭窗口
          location.reload(); // Refresh the current page
        }
      });
    },
    //完成删除
    deleteRule(scheduleRuleid) {
      this.$confirm("此操作将永久删除小组，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRule({ ids: scheduleRuleid }).then((res) => {
            if (res.data.msg == "删除成功") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              location.reload(); // Refresh the current page
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
    editRule(store) {
      this.infoDialohTitle = "小组详情";
      this.curruntRule = JSON.parse(JSON.stringify(store));
      this.ruleInfoDialogVisible = true;
    },
    submitRuleInfo() {
      if (this.infoDialogTitle === "新建小组") {
        postRule({ ...this.curruntRule, storeId: this.tableData })
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.ruleInfoDialogVisible = false;
            location.reload(); // Refresh the current page
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: err,
              type: "error",
            });
          });
      } else {
        putRule({ ...this.curruntRule })
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.ruleInfoDialogVisible = false;
            location.reload(); // Refresh the current page
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
.div {
  float: left;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  height: 70%;
  width: 100%;
  margin-bottom: 20px;
}
.el-table{
  border-radius: 15px 15px 15px 15px;
  box-shadow:4px 4px 15px #635d5d;
}
</style>