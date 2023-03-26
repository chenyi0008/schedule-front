<template>
  <div>
    <el-button
      class="mainButton"
      type="primary"
      plain
      @click="dialogVisible=true"
    >新增普通规则</el-button>
    
    <el-button
    class="mainButton"
      type="primary"
      plain
      @click="anotherdialogVisible=true"
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
          <el-select v-model="form.ruleType" placeholder="请选择" style="width:100%">
    <el-option 
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </el-form-item>
        </template>

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
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        </template>


        <template><div style="width:100%">
          开店人员
        <el-select v-model="value1" multiple placeholder="请选择" style="width:77%">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
  </template>

  <template><div style="width: 100%;">
      值班人员
        <el-select v-model="value2" multiple placeholder="请选择" style="width:77%">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
  </template>

  <template>
    <div style="width:100%;">
        关店人员
        <el-select v-model="value3" multiple placeholder="请选择" style="width:77%">

          <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>
  </template>

        <el-form-item>
          <el-button 
            type="primary"
            @click="addTable()"
          >提交</el-button>
          <el-button @click="anotherdialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    





        <!-- 编辑小组详情模态框 -->
        <el-dialog :title="infoDialogTitle" :visible.sync="ruleInfoDialogVisible">
      <el-form :model="curruntRule">
        <el-form-item
          v-if="infoDialogTitle != '新建小组'"
          label="规则类型"
          :label-width="formLabelWidth"

        >
          <el-input v-model="curruntRule.ruleType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据" :label-width="formLabelWidth">
          <el-input v-model="curruntRule.value" autocomplete="off"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ruleInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRuleInfo"> 提 交 </el-button>
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
import { getAllRule , postRule, deleteRule,putRule, } from "@/apis/rule";
export default {
  data() {
    return {
      input: "职位规则",
      Rules:[],
      ruleMenbers:[],
      curruntRuleId:"",
      curruntRule:{
        id:"",
        name:"",
      },
      RuleMenberDialogVisible:false,
      ruleInfoDialogVisible:false,
      infoDialogTitle:"",
      formLabelWidth:"",
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
        storeId:"",
        id:null,
      },
      //添加数据的对话框是否展示的标记
      dialogVisible: false,
      //添加另外一个数据的对话框是否展示的标记
      anotherdialogVisible: false,

      form: {
        ruleType: "",
        value: "",
        id:null,
        storeId:"",
      },
      options1: [{
          value: '选项1',
          label: '开店规则'
        }, {
          value: '选项2',
          label: '关店规则'
        }, {
          value: '选项3',
          label: '客流规则'
        }, {
          value: '选项4',
          label: '值班规则'
        }, {
        value: '选项5',
          label: '休息规则'
        }, 
      ],
        value: '',


        options: [{
          value: '选项1',
          label: '店长'
        }, {
          value: '选项2',
          label: '副店长'
        }, {
          value: '选项3',
          label: '经理'
        }, {
          value: '选项4',
          label: '副经理'
        }, {
          value: '选项5',
          label: '导购员'
        },
        {
          value: '选项6',
          label: '收银员'
        },
        {
          value: '选项7',
          label: '店员'
        }
      ],
        value1: [],
        value2:[],
        value3:[],
      currentPage: 4,
    };
  
  },
  components: {
    shopButton,
  },
    // 挂载初始化
    mounted() {
    var _this = this;
    getAllRule().then((res) => {
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
      postRule(this.form).then((res) => {
        if (res.data.code == 1) {
          //添加成功
          this.$message.success(res.data.msg);
          this.dialogVisible = false;
          //关闭窗口
          
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
    editRule(store){
    this.infoDialohTitle="小组详情";
    this.curruntRule = JSON.parse(JSON.stringify(store));
    this.ruleInfoDialogVisible = true ;
    },
    submitRuleInfo(){
      if (this.infoDialogTitle === "新建小组") {
        postRule({ ...this.curruntRule, storeId: this.tableData })
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.ruleInfoDialogVisible = false;
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
        putRule({ ...this.curruntRule ,})
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.ruleInfoDialogVisible = false;
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



    
}};
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
.div{
  float: left;
}
</style>
