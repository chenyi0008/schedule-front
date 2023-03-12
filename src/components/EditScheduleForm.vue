<template>
	<el-dialog :title="title" :visible.sync="dialogFormVisible">
		<el-form class="aa" :model="form">
			<el-form-item label="员工" :label-width="formLabelWidth">
				<el-input v-model="form.staff" autocomplete="off"></el-input>
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
			<el-button type="primary" @click="dialogFormVisible = false"
				>确 定</el-button
			>
		</div>
	</el-dialog>
</template>

<script>
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
				this.form = event;
				this.title = "编辑排班";
			} else {
				this.form = {};
				this.title = "新增排班";
				this.time = [new Date(), new Date()];
			}
			this.dialogFormVisible = true;
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
