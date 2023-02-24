<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="showStaff"
      tooltip-effect="dark"
      style="width: 100%"
      height="80vh"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column sortable prop="id" label="员工id" width="120" />
      <el-table-column :prop="name" label="姓名" width="120" />
      <el-table-column prop="role" label="职位" width="120" />
      <el-table-column prop="telephone" label="电话" width="200" />
      <el-table-column prop="mailbox" label="邮箱" width="300" />
      <el-table-column
        style="
           {
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
      <el-table-column prop="storeId" label="门店编号" width="120" />
    </el-table>
  </div>
</template>
<script>
import { getStaffByPage } from "@/apis/staff";
import { getGroupByStoreId, staffJoinGroup } from "@/apis/group";
// import storage from "@/storage/index.vue";
export default {
  name: "employeePreferences",

  data() {
    return {
      storeId: -1,
      staffList: [],
      multipleTable: [],
      groups: [],
    };
  },
  mounted() {
    this.storeId = this.$store.state.storeId;
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
      this.getGroupList(this.storeId);
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
</style>
