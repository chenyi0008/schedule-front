<template>
	<el-dialog :title="title" :visible.sync="dialogFormVisible">
		<el-form class="aa" :model="form">
			<el-form-item label="员工" :label-width="formLabelWidth">
				<el-select v-model="form.staffId" placeholder="请选择员工">
					<el-option
						v-for="staff in $store.state.staffs"
						:key="staff.id"
						:label="staff.name"
						:value="staff.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="工作类型" :label-width="formLabelWidth">
				<el-select v-model="form.work" placeholder="请选择工作类型">
					<el-option label="准备工作" value="准备工作"></el-option>
					<el-option label="值班工作" value="值班工作"></el-option>
					<el-option label="收尾工作" value="收尾工作"></el-option>
				</el-select>
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
import { getStaffByPage } from "@/apis/staff";
export default {
	data() {
		return {
			dialogFormVisible: false,
			formLabelWidth: "100px",
			title: "编辑排班",
			form: { staffId: "", staff: "" },
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
				localStorage.setItem("form", JSON.stringify(this.form));
				postPlan({
					...this.form,
					storeId: this.$store.state.storeId,
				}).then((res) => console.log(res.data));
			} else {
				putPlan(this.form).then((res) => {
					console.log(res.data);
				});
			}
			setTimeout(
				() => this.$bus.$emit("handleCalendarPage", "refresh", {}),
				200
			);
			this.dialogFormVisible = false;
			// location.reload();
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
			return hour + ":" + fix(minute);
		},
		fixNum(num) {
			return num < 10 ? "0" + num : num;
		},
	},
	watch: {
		dialogFormVisible() {
			getStaffByPage({
				page: 1,
				pageSize: 99999,
				storeId: this.$store.state.storeId,
			}).then((res) => {
				this.$store.commit("updateStaffs", res.data.data);
			});
		},
		"form.staffId"() {
			const form = this.form;
			this.$store.state.staffs.forEach((staff) => {
				if (form.staffId == staff.id) form.staff = staff.name;
			});
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
