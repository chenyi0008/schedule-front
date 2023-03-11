<template>
	<div>
		<!-- <el-table :data="tableData" style="width: 100%" height="600">
			<el-table-column fixed prop="time" label="时间" width="150">
			</el-table-column>
			<el-table-column prop="mon" label="周一"> </el-table-column>
			<el-table-column prop="tue" label="周二"> </el-table-column>
			<el-table-column prop="wen" label="周三"> </el-table-column>
			<el-table-column prop="thu" label="周四"> </el-table-column>
			<el-table-column prop="fri" label="周五"> </el-table-column>
			<el-table-column prop="sat" label="周六"> </el-table-column>
			<el-table-column prop="sun" label="周日"> </el-table-column>
		</el-table> -->
		<ScheduleCalendar :startDate="startDate" />
	</div>
</template>

<script>
import ScheduleCalendar from "@/components/SchedualCalendar.vue";
import { getPlan } from "@/apis/plan";
export default {
	data() {
		return {
			storeId: null,
			startDate: "",
			endDate: "",
			schedule: {
				time: [],
				mon: [],
				tue: [],
				wen: [],
				thu: [],
				fri: [],
				sat: [],
				sun: [],
			},
		};
	},
	mounted() {
		this.storeId = this.$store.state.storeId;
		this.schedule.time = this.createTimeList();
		// 计算当周时间
		let now = new Date();
		const fix = this.fixNum;
		this.startDate =
			now.getFullYear() +
			"-" +
			(fix(now.getMonth() + 1) +
				"-" +
				fix(now.getDate() - now.getDay() + 1));
		this.endDate =
			now.getFullYear() +
			"-" +
			(fix(now.getMonth() + 1) +
				"-" +
				fix(now.getDate() - now.getDay() + 7));
	},
	methods: {
		fixNum(num) {
			return num < 10 ? "0" + num : num;
		},
		createTimeList() {
			const fix = this.fixNum;
			let time = [];
			for (let i = 9; i < 21.5; i += 0.5) {
				time.push(
					fix(i % 1 > 0 ? i - 0.5 : i) +
						":" +
						(i % 1 > 0 ? "30" : "00")
				);
			}
			return time;
		},
		getSchedule(startDate, endDate) {
			getPlan({ storeId: this.storeId, startDate, endDate })
				.then((res) => {
					if (res.data.data === null) alert(res.data.msg);
					else {
						console.log(res.data.data);
					}
				})
				.catch((err) => {
					alert("网络错误");
					console.log(err);
				});
		},
	},
	watch: {
		"$store.state.storeId"(newStoreId) {
			this.storeId = newStoreId;
			this.getSchedule(this.startDate, this.endDate);
		},
	},
	components: {
		ScheduleCalendar,
	},
};
</script>

<style></style>

<!-- <template>
	<div>
		<el-table style="width: 100%" :data="getValues" :show-header="false">
			<el-table-column
				v-for="(item, index) in getHeaders"
				:key="index"
				:prop="item"
			>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			headers: [
				{
					prop: "xq",
					label: "星期",
				},
				{
					prop: "date",
					label: "日期",
				},
				{
					prop: "name",
					label: "姓名",
				},
				{
					prop: "address",
					label: "地址",
				},
			],
			tableData: [
				{
					date: "2016-05-02",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
				},
				{
					date: "2016-05-04",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1517 弄",
				},
				{
					date: "2016-05-01",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1519 弄",
				},
				{
					date: "2016-05-03",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1516 弄",
				},
			],
		};
	},
    methods(){
        
    },

	computed: {
		getHeaders() {
			return this.tableData.reduce(
				(pre, cur, index) => pre.concat(`value${index}`),
				["title"]
			);
		},
		getValues() {
			return this.headers.map((item) => {
				return this.tableData.reduce(
					(pre, cur, index) =>
						Object.assign(pre, {
							["value" + index]: cur[item.prop],
						}),
					{ title: item.label }
				);
			});
		},
	},
};
</script>

<style></style> -->
