<template>
  <el-dialog
    :title="dateString + '营业数据'"
    :visible.sync="visible"
    width="80%"
    top="10px"
    center
  >
    <div class="container">
      <el-table
        border
        :data="data"
        :row-class-name="rowClass"
        :header-row-style="{ height: '10px' }"
        :row-style="{ height: '10px' }"
        height="60vh"
      >
        <template v-for="(val, index) in data.length > 4 ? 4 : data.length">
          <el-table-column label="时间" align="center" prop="time">
            <template
              slot-scope="scope"
              v-if="scope.$index * 4 + index < data.length"
              >{{ data[scope.$index * 4 + index].time }}</template
            >
          </el-table-column>
          <el-table-column label="数据" align="center" prop="data">
            <template
              slot-scope="scope"
              v-if="scope.$index * 4 + index < data.length"
            >
              <!-- {{ data[scope.$index * 4 + index].data }} -->
              <input
                type="text"
                :value="data[scope.$index * 4 + index].data"
                @change="
                  changeData($event, data[scope.$index * 4 + index].time)
                "
            /></template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DataInputForm",
  data() {
    return {
      visible: false,
      string: "",
    };
  },
  props: {
    date: {
      type: Date,
      require: true,
    },
    dataString: String,
    save: Function,
  },
  methods: {
    submit() {
      this.visible = false;
      this.save(this.date, this.string);
    },
    rowClass({ row, rowIndex }) {
      if (rowIndex >= 12) return "null";
      return;
    },
    show() {
      this.visible = true;
    },
    timeFormat(num) {
      return num < 10 ? "0" + num : num.toString();
    },
    changeData(e, t) {
      console.log(e.target.value, t);
      this.data = [t, e.target.value];
    },
  },
  watch: {
    dataString() {
      this.string = this.dataString;
      console.log(">>>>", this.string);
    },
  },
  computed: {
    dateString() {
      return (
        this.date.getFullYear() +
        "年" +
        (this.date.getMonth() + 1) +
        "月" +
        this.date.getDate() +
        "日"
      );
    },
    data: {
      get() {
        var dataArr = this.dataString.split(",");
        var data = [];
        var h = 0,
          s = 0;
        for (var i = 0; i < 48; i++) {
          data.push({
            time:
              this.timeFormat(h) +
              ":" +
              this.timeFormat(s) +
              "--" +
              this.timeFormat(s == 30 ? h + 1 : h) +
              ":" +
              this.timeFormat(s == 30 ? 0 : 30),
            data: dataArr[i],
          });
          if (s == 30) {
            h++;
            s = 0;
          } else s = 30;
        }
        return data;
      },
      set(val) {
        var dataArr = [];
        this.data.forEach((item) => {
          if (item.time == val[0]) item.data = val[1];
          dataArr.push(item.data);
        });
        this.string = dataArr.join(",");
      },
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-dialog {
  transform: scale(0.5);
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
}

input {
  width: 100%;
  height: 100%;
  display: inline-block;
  margin: 0px;
  padding: 0px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 0;
  text-align: center;
  line-height: 10px;
  background: transparent;
}

.null {
  display: none;
}

::v-deep .el-dialog__header {
  padding: 0px;
}

::v-deep .el-dialog__body {
  padding: 0px 20px;
}
::v-deep .el-dialog__footer {
  padding: 0px;
}
</style>
