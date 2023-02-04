<template>
  <div>
    <!-- <h1>我是预测数据</h1> -->
    <el-calendar v-model="calendarValue">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <p
          @click="selectDate(date)"
          :class="data.isSelected ? 'is-selected' : ''"
        >
          <!-- <el-button>粘贴</el-button>
          <el-button>复制</el-button> -->
          <input
            type="checkbox"
            @click.stop="data.isSelected = true"
            name="c"
            id="d"
          />
          {{ data.day.split("-").slice(1).join("-") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
      </template>
    </el-calendar>
    <DataInputFormVue ref="dialog" :date="currentDate" :data="currentDayData" />
  </div>
</template>
<script>
import DataInputFormVue from "@/components/DataInputForm.vue";
import { getSchedule } from "@/apis/flow";
export default {
  name: "forecastData",
  data() {
    return {
      calendarValue: "",
      showData: [],
      inputVisible: false,
      currentDate: new Date(Date.now()),
      currentDayData: [],
      data: {},
    };
  },
  mounted() {
    // console.log(this, this.calendarValue);
    getSchedule({
      storeId: "1",
      startDate: "2000-01-01",
      endDate: "2001-01-30",
    }).then((res) => {
      console.log(res.data);
    });
  },
  methods: {
    selectDate(date) {
      // alert(date);
      this.inputVisible = true;
      this.currentDate = date;
      this.$refs.dialog.show();
    },
  },
  components: {
    DataInputFormVue,
  },
  computed: {
    month() {
      return this.calendarValue == ""
        ? new Date().getMonth
        : this.calendarValue;
    },
  },
  watch: {
    // calendarValue(n) {
    //   console.log(n);
    // },
    month(p, n) {
      console.log(p, n);
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

p {
  width: 100%;
  height: 100%;
}

::v-deep .el-calendar-day {
  padding: 0px !important;
}

/* 
/deep/ .el-calendar-table .el-calendar-day {
  width: 60px;
  height: 240px;
} */
</style>
