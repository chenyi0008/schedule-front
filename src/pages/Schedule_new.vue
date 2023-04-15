<template>
	<div>
		<div class="role-filter">
			<el-select v-model="role" placeholder="请选择职位">
				<el-option label="请选择职位" value="" />
				<el-option label="门店经理" value="门店经理" />
				<el-option label="副经理" value="副经理" />
				<el-option label="小组长" value="小组长" />
				<el-option label="收银" value="收银" />
				<el-option label="导购" value="导购" />
				<el-option label="库房" value="库房" />
			</el-select>
		</div>
		<div class="group-filter">
			<el-select v-model="group" placeholder="请选择分组">
				<el-option label="请择选分组" value="" />
				<el-option
					v-for="aGroup in groups"
					:key="aGroup.id"
					:label="aGroup.name"
					:value="aGroup.name"
				/>
			</el-select>
		</div>
		<ScheduleCalendar
			:startDate="startDate"
			:events="checkRestTime"
			class="scheduleCalendar"
		/>
		<EditScheduleForm class="scheduleCalendar" />
		<GenerationSchedule class="scheduleCalendar" />
	</div>
</template>

<script>
import ScheduleCalendar from "@/components/SchedualCalendar.vue";
import EditScheduleForm from "@/components/EditScheduleForm.vue";
import GenerationSchedule from "@/components/GenerationSchedule.vue";
import { getPlan } from "@/apis/plan";
import { getGroupByStoreId } from "@/apis/group";
export default {
	data() {
		return {
			storeId: null,
			startDate: "",
			endDate: "",
			events: [],
			role: "",
			group: "",
			groups: [],
		};
	},
	mounted() {
		this.storeId = this.$store.state.storeId;
		this.getGroups();
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

			this.getSchedule(this.startDate, this.endDate);
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
		getGroups() {
			getGroupByStoreId({ storeId: this.$store.state.storeId }).then(
				(res) => {
					this.groups = res.data.data;
				}
			);
		},
		getRestTime(time) {
			let end = time.split("--")[1];
			let [eh, em] = end.split(":");
			if (em == "30") {
				eh++;
				em = "00";
			} else {
				em = "30";
			}
			return [end, [eh, em].join(":")].join("--");
		},
	},
	watch: {
		"$store.state.storeId"(newStoreId) {
			this.storeId = newStoreId;
			this.getSchedule(this.startDate, this.endDate);
			this.getGroups();
		},
		startDate() {
			this.getSchedule(this.startDate, this.endDate);
		},
	},
	computed: {
		filterEvents() {
			if (this.role === "") return this.events;
			return this.events.filter((event) => {
				return event.role == this.role;
			});
		},
		filterByGroup() {
			if (this.group === "") return this.filterEvents;
			return this.filterEvents.filter((event) => {
				return event.groupName == this.group;
			});
		},
		checkRestTime() {
			let eventList = this.filterByGroup;
			this.filterByGroup.forEach((event) => {
				if (event.flag == true) {
					let restEvent = { ...event };
					restEvent.time = this.getRestTime(restEvent.time);
					restEvent.work = "休息";
					eventList.push(restEvent);
				}
			});
			return eventList;
		},
	},
	components: {
		ScheduleCalendar,
		EditScheduleForm,
		GenerationSchedule,
	},
};
</script>

<style scoped>
.role-filter {
	position: absolute;
	top: 95px;
	left: 513px;
}
.group-filter {
	position: absolute;
	top: 95px;
	right: 190px;
}
</style>
