<template>
<div>
    <h1>我是预测数据</h1>
    <el-table
      ref="multipleTable"
      :data="showData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- <el-table-column type="selection" width="55"/> -->
      <el-table-column prop="id" label="门店id" width="120"/>
      <el-table-column prop="date" label="日期" width="240"/>
      <el-table-column prop="startTime" label="开始时间" width="200"/>
      <el-table-column prop="endTime" label="结束时间" width="200"/>
      <el-table-column prop="data" label="预测客流量" width="200"/>
    </el-table>
    </div>
   
</template>
    <script>
    export default {
        name:'forecastData',
        data() {
            return {
          showData: [],
            }
        }
    }
    </script> 
