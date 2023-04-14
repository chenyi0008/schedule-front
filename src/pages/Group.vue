<template>
  <div>
    <el-button class="newGroup" type="primary" plain @click="createGroup">新 建 小 组</el-button>
    <el-table
      ref="multipleTable"
      :data="groups"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column sortable prop="id" label="小组编号" />
      <el-table-column prop="name" label="小组名称" />
      <el-table-column label="查看成员">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-search"
            @click="getGroupMenbers(scope.row.id)"
            circle
          >
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="编辑数据">
        <template slot-scope="scope">
          <el-button
            @click="editGroupInfo(scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
          >
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除小组">
        <template slot-scope="scope">
          <el-button
            @click="deleteGroup(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            circle
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看小组详情模态框 -->
    <el-dialog title="小组成员" 
    :visible.sync="groupMenberDialogVisible"
    width="40%">
      <el-table height="500px" :data="groupMenbers">
        <el-table-column property="id" label="员工编号"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="role" label="职位"></el-table-column>
        <el-table-column property="telephone" label="电话"></el-table-column>
        <el-table-column property="mailbox" label="邮箱"></el-table-column>
        <el-table-column label="移出小组">
          <template slot-scope="scope">
            <el-button
              @click="deleteMenberOfGroup(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
            >
            </el-button> </template
        ></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 编辑小组详情模态框 -->
    <el-dialog :title="infoDialogTitle" 
    width="40%"
    :visible.sync="groupInfoDialogVisible">
      <el-form :model="curruntGroup">
        <el-form-item
          v-if="infoDialogTitle != '新建小组'"
          label="小组编号"
          :label-width="formLabelWidth"
        >
          <el-input v-model="curruntGroup.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小组名称" :label-width="formLabelWidth">
          <el-input v-model="curruntGroup.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="infoDialogTitle != '新建小组'"
          label="所属门店"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="curruntGroup.storeId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 这个地方可以改成商店的下拉选择器 -->
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="curruntGroup.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="groupInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitGroupInfo"> 提 交 </el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import {
  getGroupByStoreId,
  getStaffIdByGroup,
  deleteGroup,
  staffJoinGroup,
  postGroup,
  putGroup,
} from "@/apis/group";
export default {
  mounted() {
    this.storeId = this.$store.state.storeId;
    this.getGroups(this.storeId);
  },
  data() {
    return {
      storeId: -1,
      groups: [],
      groupMenbers: [],
      curruntGroupId: "",
      curruntGroup: {
        id: "",
        name: "",
      },
      groupMenberDialogVisible: false,
      groupInfoDialogVisible: false,
      infoDialogTitle: "",
      formLabelWidth: "",
    };
  },
  methods: {
    getGroups(storeId) {
      getGroupByStoreId({ storeId }).then((res) => {
        this.groups = res.data.data;
      });
    },
    getGroupMenbers(groupId) {
      this.curruntGroupId = groupId;
      getStaffIdByGroup({ groupId }).then((res) => {
        this.groupMenbers = res.data.data;
        this.groupMenberDialogVisible = true;
      });
    },
    editGroupInfo(group) {
      this.infoDialogTitle = "小组详情";
      this.curruntGroup = JSON.parse(JSON.stringify(group));
      this.groupInfoDialogVisible = true;
    },
    submitGroupInfo() {
      if (this.infoDialogTitle === "新建小组") {
        postGroup({ ...this.curruntGroup, storeId: this.storeId })
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.groupInfoDialogVisible = false;
            this.getGroups(this.storeId);
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: err,
              type: "error",
            });
          });
      } else {
        putGroup({ ...this.curruntGroup })
          .then((res) => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
            this.groupInfoDialogVisible = false;
            this.getGroups(this.storeId);
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
    deleteGroup(groupId) {
      this.$confirm("此操作将永久删除该小组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteGroup({ id: groupId }).then((res) => {
            if (res.data.msg == "删除成功") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getGroups(this.storeId);
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
    deleteMenberOfGroup(staffId) {
      this.$confirm("此操作将会将成员移出小组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          staffJoinGroup({ staffId, groupId: "-1" }).then((res) => {
            if (res.data.msg == "删除成功") {
              this.$message({
                type: "success",
                message: "移出小组成员成功!",
              });
              this.getGroupMenbers(this.curruntGroupId);
            } else throw new Error(res.data.msg);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    createGroup() {
      this.curruntGroup = { id: "", name: "", storeId: "" };
      this.infoDialogTitle = "新建小组";
      this.groupInfoDialogVisible = true;
    },
  },
  watch: {
    "$store.state.storeId"(newStoreId) {
      this.storeId = newStoreId;
      this.getGroups(newStoreId);
    },
  },
};
</script>

<style scoped>
.newGroup{
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
</style>
