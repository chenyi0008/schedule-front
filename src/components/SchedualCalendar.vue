<template>
	<FullCalendar :options="calendarOption" />
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
// import dayGridPlugin from "@fullcalendar/daygrid";
export default {
	data() {
		let now = new Date();
		const fix = this.fixNum;
		let startDate =
			now.getFullYear() +
			"-" +
			(fix(now.getMonth() + 1) +
				"-" +
				fix(now.getDate() - now.getDay() + 1));
		return {
			calendarOption: {
				plugins: [resourceTimeGridPlugin],
				initialDate: new Date(startDate),
				timeZone: "UTC",
				initialView: "timeGridaWeak",
				locale: "zh-cn",
				allDaySlot: false, //是否显示全天事件
				slotMinTime: "09:00:00", //开始时间
				slotMaxTime: "22:00:00", //结束时间
				headerToolbar: {
					left: "prev,next",
					center: "title",
					right: "timeGridDay,timeGridaWeak",
				},
				views: {
					timeGridaWeak: {
						type: "timeGrid",
						duration: { days: 7, start: "2023-03-06" },
						buttonText: "7 day",
					},
				},
				events: [
					{
						title: "xx",
						start: "2023-03-11 07:00",
						end: "2023-03-11 16:30",
					},
					{
						title: "xxa",
						start: "2023-03-11 12:00",
						end: "2023-03-11 20:30",
					},
					{
						title: "xxs",
						start: "2023-03-11 07:00",
						end: "2023-03-11 20:30",
					},
					{
						title: "xxss",
						start: "2023-03-11 07:00",
						end: "2023-03-11 20:30",
					},
				],
			},
		};
	},
	props: {
		startDate: String,
	},
	methods: {
		fixNum(num) {
			return num < 10 ? "0" + num : num;
		},
	},
	components: {
		FullCalendar,
	},
};
</script>

<style>
.fc-license-message {
	display: none;
}
</style>
