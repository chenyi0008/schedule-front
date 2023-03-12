<template>
	<div>
		<ScheduleCalendar :startDate="startDate" :events="events" />
		<EditScheduleForm />
	</div>
</template>

<script>
import ScheduleCalendar from "@/components/SchedualCalendar.vue";
import EditScheduleForm from "@/components/EditScheduleForm.vue";
import { getPlan } from "@/apis/plan";
export default {
	data() {
		return {
			storeId: null,
			startDate: "",
			endDate: "",
			events: [],
		};
	},
	mounted() {
		this.storeId = this.$store.state.storeId;
		this.getSchedule(this.startDate, this.endDate);
		// 计算当周时间
		let now = new Date();
		const fix = this.fixNum;
		this.startDate =
			now.getFullYear() +
			"-" +
			(fix(now.getMonth() + 1) +
				"-" +
				fix(
					now.getDate() - (now.getDay() === 0 ? 7 : now.getDay()) + 1
				));
		this.endDate =
			now.getFullYear() +
			"-" +
			(fix(now.getMonth() + 1) +
				"-" +
				fix(
					now.getDate() - (now.getDay() === 0 ? 7 : now.getDay()) + 7
				));
	},
	methods: {
		fixNum(num) {
			return num < 10 ? "0" + num : num;
		},
		getSchedule(startDate, endDate) {
			getPlan({ storeId: this.storeId, startDate, endDate })
				.then((res) => {
					if (res.data.data === null) alert(res.data.msg);
					else {
						this.events = res.data.data;
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
		EditScheduleForm,
	},
};
</script>

<style></style>
