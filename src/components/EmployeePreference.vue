<template>
	<el-dialog
		title="员工偏好"
		:visible.sync="employeePreferenceVisible"
		width="60%"
	>
		<el-table :data="preferences" stripe style="width: 100%">
			<el-table-column prop="preferenceType" label="偏好类型">
			</el-table-column>
			<el-table-column prop="value" label="偏好值"></el-table-column>
		</el-table>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="handleInnerVisible"
				>新 增</el-button
			>
			<el-button @click="handleVisible"> 关 闭 </el-button>
		</span>
		<!-- 新增偏好 -->
		<el-dialog
			title="新增偏好"
			:visible.sync="createPreferenceVisible"
			append-to-body
		>
			<el-form ref="form" :model="form" label-width="150px">
				<el-form-item label="偏好类型">
					<el-select
						v-model="form.preferenceType"
						placeholder="请选择偏好类型"
					>
						<el-option label="工作日偏好" value="工作日偏好" />
						<el-option label="工作时间偏好" value="工作时间偏好" />
						<el-option label="班次时长偏好" value="班次时长偏好" />
					</el-select>
				</el-form-item>
				<el-form-item
					v-if="form.preferenceType === '工作日偏好'"
					label="工作日选择"
				>
					<el-checkbox-group v-model="workPreference">
						<el-checkbox label="1" name="type">周一</el-checkbox>
						<el-checkbox label="2" name="type">周二</el-checkbox>
						<el-checkbox label="3" name="type">周三</el-checkbox>
						<el-checkbox label="4" name="type">周四</el-checkbox>
						<el-checkbox label="5" name="type">周五</el-checkbox>
						<el-checkbox label="6" name="type">周六</el-checkbox>
						<el-checkbox label="0" name="type">周日</el-checkbox>
					</el-checkbox-group>
				</el-form-item>

				<el-form-item
					v-else-if="form.preferenceType === '工作时间偏好'"
					label="工作时间选择"
				>
					<div
						v-for="(time, index) in timePreference"
						:key="time + index"
						:style="{ marginTop: index != 0 ? '10px' : '0px' }"
					>
						<el-time-select
							v-model="time.start"
							:picker-options="{
								start: '08:00',
								step: '01:00',
								end: time.end || '22:00',
							}"
							placeholder="选择开始时间"
						/>
						至
						<el-time-select
							v-model="time.end"
							:picker-options="{
								start: time.start || '08:00',
								step: '01:00',
								end: '22:00',
							}"
							placeholder="选择结束时间"
						/>
						&nbsp;
						<el-button
							@click="reducePTime(index)"
							icon="el-icon-minus"
							circle
						/>
						<el-button
							v-if="index + 1 === timePreference.length"
							@click="timePreference.push({ start: '', end: '' })"
							icon="el-icon-plus"
							circle
						/>
					</div>

					<el-button
						v-if="timePreference.length === 0"
						@click="timePreference.push({ start: '', end: '' })"
						icon="el-icon-plus"
						circle
					/>
				</el-form-item>
				<el-form-item
					v-else-if="form.preferenceType === '班次时长偏好'"
					label="班次时长选择"
				>
					<div>
						每天最多工作
						<el-input
							v-model="durationPreference.day"
							placeholder="每天最多工作时长"
							type="number"
							max="12"
							min="0"
							class="time-input"
						>
							<i slot="suffix">小时</i>
						</el-input>
					</div>
					<div>
						每周最多工作
						<el-input
							v-model="durationPreference.weak"
							placeholder="每周最多工作时长"
							type="number"
							max="12"
							min="0"
							class="time-input"
						>
							<i slot="suffix">小时</i>
						</el-input>
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="createPreference"
					>新 增</el-button
				>
				<el-button @click="handleInnerVisible"> 取 消 </el-button>
			</span>
		</el-dialog>
	</el-dialog>
</template>

<script>
import { getPreferenceByUserId, postPreference } from "@/apis/preference";
export default {
	name: "EmployeePreference",
	data() {
		return {
			employeePreferenceVisible: false,
			createPreferenceVisible: false,
			employeeId: "",
			preferences: [],
			workPreference: [],
			durationPreference: { day: "", weak: "" },
			timePreference: [{ start: "", end: "" }],
			form: {
				preferenceType: "",
				value: "",
			},
		};
	},
	methods: {
		editPreference(employeeId) {
			this.handleVisible();
			this.employeeId = employeeId;
		},
		handleVisible() {
			this.employeePreferenceVisible = !this.employeePreferenceVisible;
		},
		handleInnerVisible() {
			this.createPreferenceVisible = !this.createPreferenceVisible;
		},
		createPreference() {
			console.log(this.value);
			postPreference({
				...this.form,
				value: this.value,
				staffId: this.employeeId,
			}).then(location.reload());
		},
		reducePTime(index) {
			this.timePreference.splice(index, 1);
		},
	},
	watch: {
		employeeId(newV) {
			getPreferenceByUserId(newV).then((res) => {
				this.preferences = res.data.data;
			});
		},
	},
	computed: {
		value() {
			const { day, weak } = this.durationPreference;
			switch (this.form.preferenceType) {
				case "工作日偏好":
					return this.workPreference.join(",");
				case "工作时间偏好":
					return this.timePreference
						.map((time) => {
							return (
								time.start.split(":")[0] +
								"-" +
								time.end.split(":")[0]
							);
						})
						.join(",");
				case "班次时长偏好":
					return day + "," + weak;
			}
			return 0;
		},
	},
};
</script>

<style scoped>
::v-deep .el-input__inner,
.el-color-picker__icon,
.el-input,
.el-textarea {
	width: initial;
}
::v-deep .time-input > input {
	width: 200px !important;
}
::v-deep .el-input--suffix .el-input__inner {
	padding-right: 17px;
}
</style>
