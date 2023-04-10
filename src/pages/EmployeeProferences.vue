<template>
  <div>
    <el-button class="addNew" type="primary" plain @click="openDialog({ id: '' })">
      新增员工
    </el-button>
    <el-table
      ref="multipleTable"
      :data="showStaff"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <!-- <el-table-column sortable prop="id" label="员工id" width="120" /> -->
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="role" label="职位" />
      <el-table-column prop="telephone" label="电话" />
      <el-table-column prop="mailbox" label="邮箱" />
      <el-table-column
        style="{
            padding: 0;
          }
        "
        label="小组"
        width="300"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.groupName"
            placeholder="选择小组"
            @change="changeStaffGroup($event, scope.row.id)"
          >
            <el-option label="无小组" :value="null" />
            <el-option
              v-for="group in groups"
              :key="group.id"
              :label="group.name"
              :value="group.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="storeId" label="门店编号" width="120" /> -->
      <el-table-column width="100px" label="编辑">
        <template slot-scope="scope">
          <el-button
            type="primary"
            circle
            icon="el-icon-edit"
            @click="openDialog(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 员工详情模态框 -->
    <el-dialog
      :title="infoDialogTitle"
      :visible.sync="employeeInfoDialogVisible"
      width="30%"
    >
      <el-form :model="curruntEmployee">
        <el-form-item
          v-if="infoDialogTitle != '新增员工'"
          label="员工编号"
          :label-width="formLabelWidth"
        >
          <el-input v-model="curruntEmployee.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" 
        :label-width="formLabelWidth">
          <el-input
            v-model="curruntEmployee.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="label" label="职位" :label-width="formLabelWidth">
        <br>
          <el-select class="option" v-model="curruntEmployee.role" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.value">
          </el-option>
       </el-select>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input
            v-model="curruntEmployee.telephone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input
            v-model="curruntEmployee.mailbox"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="infoDialogTitle != '新增员工'"
          label="所属门店"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="curruntEmployee.storeId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          v-if="infoDialogTitle != '新增员工'"
          @click="removeEmployee"
        >
          删 除
        </el-button>
        <el-button @click="employeeInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEmpioyeeInfo">
          提 交
        </el-button>
      </div>
    </el-dialog>
    
  </div>
</template>
<script>
import { getStaffByPage, putStaff, postStaff, deleteStaff } from "@/apis/staff";
import { getGroupByStoreId, staffJoinGroup } from "@/apis/group";
// import storage from "@/storage/index.vue";
export default {
  name: "employeePreferences",

  data() {
    return {
      options:[{
        value:"店长",
      },{
        value:"店员"
      }],
      storeId: -1,
      staffList: [],
      multipleTable: [],
      groups: [],
      employeeInfoDialogVisible: false,
      infoDialogTitle: "编辑员工信息",
      formLabelWidth: "100",
      curruntEmployee: {
        id: "",
        name: "",
        role: "",
        telephone: "",
        mailbox: "",
        group: "",
      },
    };
  },
  mounted() {
    this.storeId = this.$store.state.storeId;
    this.getGroupList(this.storeId);
    getStaffByPage({ page: 1, pageSize: 99999, storeId: this.storeId }).then(
      (res) => {
        // res.data.data.filter((item) => {
        //   return item.storeId == this.storeId;
        // });
        this.staffList = res.data.data;
      }
    );
  },
  methods: {
    handleSelectionChange() {},
    getGroupList(storeId) {
      getGroupByStoreId({ storeId }).then((res) => {
        this.groups = res.data.data;
      });
    },
    changeStaffGroup(groupId, staffId) {
      staffJoinGroup({ groupId: groupId || -1, staffId });
    },
    openDialog(curruntEmployee) {
      this.infoDialogTitle = curruntEmployee.id ? "编辑员工信息" : "新增员工";
      this.curruntEmployee = curruntEmployee;
      this.employeeInfoDialogVisible = true;
    },
    updateEmployeeData() {
      putStaff(this.curruntEmployee).then((res) => {
        console.log(res.data);
      });
    },
    addNewEmployee() {
      postStaff({ ...this.curruntEmployee, storeId: this.storeId }).then(
        (res) => {
          console.log(res.data);
        }
      );
      getStaffByPage({ page: 1, pageSize: 99999, storeId: this.storeId }).then(
        (res) => {
          this.staffList = res.data.data;
        }
      );
    },
    removeEmployee() {
      deleteStaff({ ids: this.curruntEmployee.id }).then((res) => {
        console.log(res.data);
      });
      this.employeeInfoDialogVisible = false;
      getStaffByPage({ page: 1, pageSize: 99999, storeId: this.storeId }).then(
        (res) => {
          this.staffList = res.data.data;
        }
      );
    },
    submitEmpioyeeInfo() {
      if (this.infoDialogTitle === "编辑员工信息") {
        this.employeeInfoDialogVisible = false;
        return this.updateEmployeeData();
      }
      this.addNewEmployee();
      this.employeeInfoDialogVisible = false;
    },
  },
  computed: {
    showStaff() {
      return this.staffList.filter((item) => {
        return item.storeId == this.storeId;
      });
    },
  },
  watch: {
    "$store.state.storeId"(newV) {
      this.storeId = newV;
      this.getGroupList(newV);
      getStaffByPage({ page: 1, pageSize: 99999, storeId: this.storeId }).then(
        (res) => {
          this.staffList = res.data.data;
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  height: 100%;
  overflow: hidden;
}
::v-deep .el-table .el-table__cell {
  padding: 0;
}
::v-deep .el-table .cell {
  line-height: 50px;
}
::v-deep .el-select {
  vertical-align: middle;
  min-height: 40px;
  min-width: 100px;
}
::v-deep .el-input__inner {
  text-align: center;
}
.addNew {
  float: left;
  width: 120px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
}

.el-table{
  border-radius: 15px 15px 15px 15px;
  box-shadow:4px 4px 15px #635d5d;
}
.lable{
  
  float: left;
  clear:right;
}
.option{
  float: left;
  width: 100%;
}
</style>
