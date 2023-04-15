<template>
	<el-dialog
		:title="员工偏好"
		:visible.sync="employeePreferenceVisible"
		width="30%"
	>
	</el-dialog>
</template>

<script>
export default {
	name: "EmployeePreference",
	data() {
		return {
			employeePreferenceVisible: false,
		};
	},
};
</script>

<style></style>
