<template>
	<div>
		<ScheduleCalendar :startDate="startDate" :events="events" class="scheduleCalendar"/>
		<EditScheduleForm class="scheduleCalendar"/>
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

		//挂载日期切换事件
		this.$bus.$on("handleCalendarPage", (dirc, calendar) => {
			if (dirc === "refresh") {
				this.getSchedule(this.startDate, this.endDate);
				return;
			}
			const isAWeak =
				calendar.calendar.currentData.viewTitle.split(" – ")[1];
			const relatDay = (isAWeak ? 7 : 1) * (dirc === "prev" ? -1 : 1);
			let firstDay = new Date(
				calendar.calendar.currentData.viewTitle
					.split(" – ")[0]
					.split("年")
					.join("-")
					.split("月")
					.join("-")
					.split("日")
					.join("")
			);
			firstDay.setDate(firstDay.getDate() + relatDay);
			const { startDate, endDate } = this.getCurrentWeak(firstDay);
			this.startDate = startDate;
			this.endDate = endDate;
		});
	},
	methods: {
		fixNum(num) {
			return num < 10 ? "0" + num : num;
		},
		formatDate(now) {
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var date = now.getDate();
			return year + "-" + month + "-" + date;
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
		getCurrentWeak(firstDay) {
			const formatDate = this.formatDate;
			let lastDay = new Date();
			lastDay.setDate(firstDay.getDate() + 7);
			return {
				startDate: formatDate(firstDay),
				endDate: formatDate(lastDay),
			};
		},
	},
	watch: {
		"$store.state.storeId"(newStoreId) {
			this.storeId = newStoreId;
			this.getSchedule(this.startDate, this.endDate);
		},
		startDate() {
			this.getSchedule(this.startDate, this.endDate);
		},
	},
	components: {
		ScheduleCalendar,
		EditScheduleForm,
	},
};
</script>

<style scoped>

</style>
