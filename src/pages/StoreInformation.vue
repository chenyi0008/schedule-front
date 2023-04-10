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
      title="新增门店"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        class="edit-form"
      >
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="面积" :label-width="formLabelWidth">
          <el-input v-model="form.size"></el-input>
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
      <el-form-item label="">
        <el-input
          v-model="searchData.name"
          placeholder="名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
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

        <!-- 编辑小组详情模态框 -->
        <el-dialog :title="infoDialogTitle" :visible.sync="storeInfoDialogVisible" custom-class="my-dialog">
      <el-form :model="curruntStore">
        <el-form-item
          v-if="infoDialogTitle != '新建小组'"
          label="商店名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="curruntStore.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商店地址" :label-width="formLabelWidth">
          <el-input v-model="curruntStore.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="infoDialogTitle != '新建小组'"
          label="商店面积"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="curruntStore.size"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="storeInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitStoreInfo"> 提 交 </el-button>
      </div>
    </el-dialog>

    <!-- 桌面数据 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
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
      <template slot-scope="scope">
          <el-button
            @click="editStore(scope.row)"
            type="primary"
            class="edit"
            plain
          >编辑</el-button>
          <el-button
            @click="deleteStore(scope.row.id)"
            type="danger"
            class="delete"
            plain
          >删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    
    
    <!-- 分页查询 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,15]"
      :page-size="9999"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import shopButton from "../components/shopButton.vue";
import {
  postStore,
  deleteStore,
  getStoreByPage,
  putStore,
} from "@/apis/store";
export default {
  name: "tableView",
  components: {
    shopButton,
  },
  data() {
    return {
      //每页显示的条数
      pageSize:5,
      //总记录数
      totalCount:100,
      storeId:-1,
      stores:[],
      storeMenbers: [],
      currentStoreId:"",
      curruntStore:{
        id:"",
        name:"",
      },
      storeMenberDialogVisible:false,
      storeInfoDialogVisible:false,
      infoDialogTitle:"",
      formLabelWidth:"100",
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
      currentPage: 1,
    };
  },
  mounted() {
    this.fetchData(this.currentPage, this.pageSize,this.storeName,this.address);
  },
  
  methods: {
    fetchData(page, pageSize,storeName,address) {

    getStoreByPage({page, pageSize,storeName,address}).then((res) => {
      
      //设置表格数据
      this.tableData = res.data.data.records;
      this.searchData = res.data;
      //设置总记录数
      this.totalCount = res.data.data.total
    });
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
      this.fetchData(this.currentPage, this.pageSize, this.storeName, this.address);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.fetchData(this.currentPage, this.pageSize, this.storeName, this.address);
    },
    handleCurrentChange(val) {
    this.currentPage = val;
    this.fetchData(this.currentPage, this.pageSize, this.storeName, this.address);
  },

    //查询方法
    onSubmit() {
  const page = 1; // 第一页
  const pageSize = 10; // 每页显示10条数据
  const storeName = this.searchData.name; // 从表单中获取店铺名称
  const address = this.searchData.address; // 从表单中获取地址
  // 调用分页查询函数
  getStoreByPage({ page, pageSize, storeName, address }).then((res) => {
    // 设置表格数据
    this.tableData = res.data.data.records;
    // 将获取的数据赋值给一个新的变量
    const searchData = res.data;
    // 将新的变量赋值给页面显示的数据变量
    this.searchData = searchData;
    // 设置总记录数
    this.totalCount = res.data.data.total;
  });
}

,
    //提交新数据
    addTable() {
      // console.log(this.form)
      // 发送ajax请求，添加数据

      postStore(this.form).then((res) => {
        if (res.data.code == 1) {
          //添加成功
          this.$message.success(res.data.msg);
          this.dialogVisible = false;
          console.log(this.form)
          //关闭窗口
          location.reload(); // Refresh the current page
        }
      });
    },
    //完成删除
    deleteStore(storeInformation) {
      this.$confirm("此操作将永久删除小组，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteStore({ ids: storeInformation }).then((res) => {
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
    //编辑商店
    editStore(store){
    this.infoDialohTitle="小组详情";
    this.curruntStore = JSON.parse(JSON.stringify(store));
    this.storeInfoDialogVisible = true ;
    },
    submitStoreInfo(){
      if (this.infoDialogTitle === "新建小组") {
        postStore({ ...this.curruntStore, storeId: this.tableData })
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.storeInfoDialogVisible = false;
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
        putStore({ ...this.curruntStore ,})
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.storeInfoDialogVisible = false;
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
.demo-form-inline .el-input {
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

.demo-form-inline{
  float:right;
}

.my-dialog{
  border-radius: 20px;
}

.el-pagination{
  margin-top: 50px;
}

.el-table{
  border-radius: 30px 30px 30px 30px;
  box-shadow:4px 4px 15px #635d5d;
}
.edit-form{
  border-radius: 30px 30px 30px 30px;

}

</style> 
