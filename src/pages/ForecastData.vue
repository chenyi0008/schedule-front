<template>
	<div>
		<uploadView class="upload" />
		<el-calendar v-model="calendarValue">
			<!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
			<template slot="dateCell" slot-scope="{ date, data }">
				<p
					@click="selectDate(date)"
					:class="data.isSelected ? 'is-selected' : ''"
				>
					<!-- <el-button>粘贴</el-button>
          <el-button>复制</el-button> -->
					<!-- <input
            type="checkbox"
            @click.stop="data.isSelected = true"
            name="c"
            id="d"
          /> -->
					{{ data.day.split("-").slice(1).join("-") }}
					<!-- {{ data.isSelected ? "✔️" : "" }} -->
					{{ isExist(data.day) ? "💾" : "" }}
				</p>
			</template>
		</el-calendar>
		<DataInputFormVue
			ref="dialog"
			:date="currentDate"
			:dataString="currentDayData"
			:save="save"
		/>
	</div>
</template>
<script>
import DataInputFormVue from "@/components/DataInputForm.vue";
import uploadView from "@/components/uploadView.vue";
import { getSchedule, putSchedule } from "@/apis/flow";
export default {
	name: "forecastData",
	data() {
		return {
			calendarValue: "",
			showData: [],
			currentDate: new Date(Date.now()),
			currentDayData: "",
			data: [],
			dialogVisible: false,
		};
	},
	mounted() {
		// console.log(this, this.calendarValue);
		this.storeId = this.$store.state.storeId;
		getSchedule({
			storeId: this.$store.state.storeId,
			startDate: this.dateFormart(new Date(), false, true),
			endDate: this.dateFormart(new Date(), true, true),
		}).then((res) => {
			// console.log("get", res.data.data);
			this.data = res.data.data;
		});
	},
	methods: {
		selectDate(date) {
			// alert(date);
			this.currentDate = date;
			this.currentDayData = this.findData();
			this.$refs.dialog.show();
		},
		findData() {
			for (var i = 0; i < this.data.length; i++) {
				var item = this.data[i];
				// console.log(
				// 	"compare",
				// 	item.date,
				// 	this.dateFormart(this.currentDate)
				// );
				if (item.date == this.dateFormart(this.currentDate)) {
					// console.log("finding!!", item.value);
					return item.value;
				}
			}
			var defaultValue = [];
			for (i = 0; i < 48; i++) {
				defaultValue.push("0.0");
			}
			// console.log("new value", defaultValue.join(","));
			return defaultValue.join(",");
		},
		getData(date) {
			getSchedule({
				storeId: this.$store.state.storeId,
				startDate: this.dateFormart(date, false, true),
				endDate: this.dateFormart(date, true, true),
			}).then((res) => {
				// console.log("get", res.data.data);
				this.data = res.data.data;
			});
		},
		timeFormat(num) {
			return num < 10 ? "0" + num : num.toString();
		},
		dateFormart(date, nextMonth = false, first = false) {
			return (
				date.getFullYear() +
				"-" +
				this.timeFormat(date.getMonth() + (nextMonth ? 2 : 1)) +
				"-" +
				(first ? "01" : this.timeFormat(date.getDate()))
			);
		},
		save(date, string) {
			this.currentDayData = string;
			putSchedule([
				{
					storeId: this.$store.state.storeId,
					date: this.dateFormart(date),
					value: string,
					id: null,
				},
			]).then((res) => {
				console.log(res.data);
			});
			this.data.unshift({
				storeId: this.$store.state.storeId,
				date: this.dateFormart(date),
				value: string,
				id: null,
			});
			// console.log(this.dateFormart(date), string);
		},
		isExist(date) {
			for (var i = 0; i < this.data.length; i++) {
				var item = this.data[i];
				// console.log(date);
				if (item.date == date) {
					return true;
				}
			}
			return false;
		},
	},
	components: {
		DataInputFormVue,
		uploadView,
	},
	computed: {
		month() {
			return this.calendarValue == ""
				? new Date().getMonth
				: this.calendarValue;
		},
	},
	watch: {
		month(n) {
			// console.log(n);
			this.getData(n);
		},
		"$store.state.storeId"(newStoreId) {
			this.storeId = newStoreId;
			getSchedule({
				storeId: newStoreId,
				startDate: this.dateFormart(new Date(), false, true),
				endDate: this.dateFormart(new Date(), true, true),
			}).then((res) => {
				// console.log("get", res.data.data);
				this.data = res.data.data;
			});
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

.el-calendar {
	border-radius: 15px 15px 15px 15px;
	box-shadow: 4px 4px 15px #635d5d;
}

.upload {
	float: left;
	width: 120px;
	margin-bottom: 20px;
	margin-top: 10px;
	margin-left: 20px;
}
/* 
/deep/ .el-calendar-table .el-calendar-day {
  width: 60px;
  height: 240px;
} */
</style>
