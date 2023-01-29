<template>
  <div>
    <h1>我是员工管理</h1>
    <el-table
      ref="multipleTable"
      :data="showStaff"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="id" label="员工id" width="120"/>
      <el-table-column prop="name" label="姓名" width="120"/>
      <el-table-column prop="role" label="职位" width="120"/>
      <el-table-column prop="telephone" label="电话" width="120"/>
      <el-table-column prop="mailbox" label="邮箱" width="200"/>
      <el-table-column prop="storeId" label="门店编号" width="120"/>
    </el-table>
    </div>
    </template>
    <script>
    import {getAllStaff} from '@/apis/staff'
import storage from '@/storage/index.vue'
    export default {
      name:'employeePreferences',
      data() {
            return {
              storeId: 1,
              staffList: [],
              multipleTable: [],
            }
      },
      mounted() {
        this.storeId = this.$store.state.store;
        // console.log(this.$store)
        getAllStaff().then(res=>{
          console.log(res.data.data.filter((item) => {
            return item.storeId == this.storeId;
          }));
          this.staffList = res.data.data;
        })
      },
      methods: {
        handleSelectionChange(){
          
        },
      },
      computed: {
        // ...mapState('storeId'),
        showStaff(){
          return this.staffList.filter(item=>{
            return item.storeId == this.storeId;
          })
        }, 
        // storeId(){
        //   return this.$store.state['storeId'];
        // }
      },
      watch: {
        "$store.state.storeId"(newV){
          console.log(213);
          this.storeId = newV;
        }
      }
    }
    </script> 
