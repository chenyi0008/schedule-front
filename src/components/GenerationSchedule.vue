<template>
	<el-dialog title="生成排班数据" :visible.sync="dialogFormVisible">
		<el-date-picker
			v-model="date"
			type="daterange"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
		/>
		<br />
		<el-button @click="submit">生成</el-button>
	</el-dialog>
</template>

<script>
import { getSchedule } from "../apis/plan";
export default {
	data() {
		return {
			dialogFormVisible: false,
			date: ["", ""],
		};
	},
	mounted() {
		this.$bus.$on("generateSchedule", () => {
			this.dialogFormVisible = true;
		});
	},
	methods: {
		submit() {
			const date = this.date;
			if (date[0] === "" || date[1] === "") {
				alert("未填写时间");
				return;
			}
			getSchedule(this.$store.state.storeId, {
				startDate: this.formatDate(date[0]),
				endDate: this.formatDate(date[1]),
			}).then(location.reload());
		},
		formatDate(time) {
			const fix = this.fixNum;
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();
			return year + "-" + fix(month) + "-" + fix(date);
		},
		fixNum(num) {
			return num < 10 ? "0" + num : num;
		},
	},
};
</script>

<style></style>
