<template>
  <div>
    <!-- <h1>我是预测数据</h1> -->
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <p
          @click="selectDate(date)"
          :class="data.isSelected ? 'is-selected' : ''"
        >
          <!-- <el-button>粘贴</el-button>
          <el-button>复制</el-button> -->
          {{ data.day.split("-").slice(1).join("-") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
      </template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  name: "forecastData",
  data() {
    return {
      showData: [],
    };
  },
  methods: {
    selectDate(date) {
      alert(date);
    },
  },
};
</script>

<style scoped>
.is-selected {
  color: #1989fa;
}
::v-deep .el-calendar {
  /* max-height: 1000px; */
  width: 100%;
}
::v-deep .el-calendar-table .el-calendar-day {
        height: 70px;
 }
/* 
/deep/ .el-calendar-table .el-calendar-day {
  width: 60px;
  height: 240px;
} */
</style>
