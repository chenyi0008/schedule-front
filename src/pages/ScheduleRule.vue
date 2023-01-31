<template>
    <div>
      <el-card class="box-card" style="float: left">
        <div slot="header" class="clearfix">
          <span>固定规则</span>
          <el-button style="float: right; padding: 3px 0" type="text">增加</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
      </el-card>
      <el-card class="box-card" style="float: right">
        <div slot="header" class="clearfix">
          <span>用户自定义规则</span>
          <el-button style="float: right; padding: 3px 0" type="text">增加</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
      </el-card>
    </div>
  </template>
    <script>
    export default {name:'shiftschedulingRule',
        data() {
            return {
                
            }
        }
    }
    </script> 

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {

  width: 550px;
  height: 550px;
}
</style>