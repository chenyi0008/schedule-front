<template>
	<el-dialog :title="title" :visible.sync="dialogFormVisible">
		<el-form class="aa" :model="form">
			<el-form-item label="员工" :label-width="formLabelWidth">
				<el-input
					v-model="form.staff"
					autocomplete="off"
					placeholder="请选择员工"
				></el-input>
			</el-form-item>
			<el-form-item label="工作类型" :label-width="formLabelWidth">
				<el-input v-model="form.work" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="开始时间" :label-width="formLabelWidth">
				<el-time-picker
					is-range
					v-model="time"
					range-separator="至"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					placeholder="选择时间范围"
				/>
			</el-form-item>

			<el-form-item label="排班日期" :label-width="formLabelWidth">
				<el-date-picker
					class="date-p el-date-editor--timerange"
					v-model="date"
					type="date"
					placeholder="选择日期"
				/>
			</el-form-item>
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="submit">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { postPlan, putPlan } from "@/apis/plan";
export default {
	data() {
		return {
			dialogFormVisible: false,
			formLabelWidth: "100px",
			title: "编辑排班",
			form: {},
			time: [new Date(), new Date()],
			date: new Date(),
		};
	},
	mounted() {
		this.$bus.$on("eidtSchedual", this.eidtSchedual);
	},
	beforeDestroy() {
		this.$bus.$off("eidtSchedual");
	},
	methods: {
		eidtSchedual(event, isNewEvent = false) {
			if (!isNewEvent) {
				const times = event.time.split("--");
				this.form = event;
				this.title = "编辑排班";
				this.date = new Date(event.date);
				this.time = [
					new Date(event.date).setHours(...times[0].split(":")),
					new Date(event.date).setHours(...times[1].split(":")),
				];
			} else {
				this.form = {};
				this.title = "新增排班";
				this.time = [new Date(), new Date()];
				this.date = new Date();
			}
			this.dialogFormVisible = true;
		},
		submit() {
			this.form.date = this.formatDate(this.date);
			this.form.time =
				this.formatTime(new Date(this.time[0])) +
				"--" +
				this.formatTime(new Date(this.time[1]));
			if (this.title == "新增排班") {
				postPlan(this.form).then((res) => console.log(res.data));
			}
			putPlan(this.form).then((res) => {
				console.log(res.data);
			});
			this.$bus.$emit("handleCalendarPage", "refresh", {});
			this.dialogFormVisible = false;
		},
		formatDate(now) {
			const fix = this.fixNum;
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var date = now.getDate();
			return year + "-" + fix(month) + "-" + fix(date);
		},
		formatTime(now) {
			const fix = this.fixNum;
			var hour = now.getHours();
			var minute = now.getMinutes();
			var second = now.getSeconds();
			return fix(hour) + ":" + fix(minute) + ":" + fix(second);
		},
		fixNum(num) {
			return num < 10 ? "0" + num : num;
		},
	},
};
</script>

<style scoped>
:v-deep .el-dialog__body {
	display: flex !important;
}
::v-deep .el-input__inner {
	position: relative;
	padding: 0;
	width: 350px;
}
/* ::v-deep .date-p i.el-input__icon {
	position: absolute;
} */
::v-deep .el-range-input {
	position: relative;
}
</style>
