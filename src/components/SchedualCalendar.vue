<template>
	<div>
		<FullCalendar
			ref="calendar"
			:options="calendarOption"
			class="fullcalendar"
		/>
	</div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
// import dayGridPlugin from "@fullcalendar/daygrid";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

export default {
	data() {
		let now = new Date();
		const fix = this.fixNum;
		let startDate =
			now.getFullYear() +
			"-" +
			(fix(now.getMonth() + 1) +
				"-" +
				fix(
					now.getDate() - (now.getDay() === 0 ? 7 : now.getDay()) + 1
				));
		return {
			calendarOption: {
				plugins: [resourceTimeGridPlugin],
				initialDate: new Date(startDate),
				timeZone: "UTC",
				initialView: "timeGridaWeak",
				locale: "zh-cn",
				allDaySlot: false, //是否显示全天事件
				slotMinTime: "08:00:00", //开始时间
				slotMaxTime: "24:00:00", //结束时间
				// eventMaxStack: 3, //事件最大堆叠数
				contentHeight: 920,
				eventMouseEnter: this.handleEventMouseEnter, //日程悬浮事件
				eventClick: this.handleEventMouseClick, //日程悬浮事件
				headerToolbar: {
					left: "prec,nexc newE generation",
					center: "title",
					right: "timeGridaDay,timeGridaWeak",
				},
				customButtons: {
					prec: {
						text: "<",
						click: () => {
							this.$bus.$emit(
								"handleCalendarPage",
								"prev",
								this.$refs.calendar
							);
							this.$refs.calendar.getApi().prev();
						},
					},
					nexc: {
						text: ">",
						click: () => {
							this.$bus.$emit(
								"handleCalendarPage",
								"next",
								this.$refs.calendar
							);
							this.$refs.calendar.getApi().next();
						},
					},
					newE: {
						text: "新增排班",
						click: () => {
							// alert("add");
							this.$bus.$emit("eidtSchedual", null, true);
						},
					},
					generation: {
						text: "生成排班",
						click: () => {
							this.$bus.$emit("generateSchedule");
						},
					},
				},
				views: {
					timeGridaWeak: {
						type: "timeGrid",
						duration: { days: 7, start: startDate },
						buttonText: "周视图",
					},
					timeGridaDay: {
						type: "timeGrid",
						duration: { days: 1, start: new Date() },
						buttonText: "日视图",
					},
				},
				events: [],
			},
			colors: {
				准备工作: "#faad14",
				值班工作: "#1890ff",
				收尾工作: "#ff7a45",
				休息: "#a0d911",
				未安排: "#d9d9d9",
			},
		};
	},
	props: {
		startDate: String,
		events: [],
	},
	mounted() {
		this.calendarOption.events = this.scheduleEvents;
	},
	methods: {
		fixNum(num) {
			return num < 10 ? "0" + num : num;
		},
		handleEventMouseEnter(e) {
			// let col = e.event.borderColor;
			let eve = e.event._def.extendedProps;
			// let category = e.event._def.extendedProps.category;
			const skill = {
				门店经理: "管理决策",
				副经理: "沟通协调",
				小组长: "领导协调",
				收银: "收银服务",
				导购: "推销解疑",
				库房: "盘点调拨",
			};
			tippy(e.el, {
				content: `<div style='width: 260px;background-color:#FAFAFA;padding:5px;font-size:14px;z-index:99999;'>
                  <div style='display:flex;color: #666666;overflow: hidden;' class="${
						eve.category == 1 ? "hidden" : ""
					}">
                    <div><span style='display:inline-block;width:6px;height:6px;background-color:#318DDE;border-radius:50%;margin:0 5px;'></span>员工姓名： </div>
                    <div style="width:161px;white-space:normal;overflow: auto;table-layout:fixed; word-break: break-all; height:auto;display:inner-block">${
						e.event.title
					}</div>
                  </div>
                  <div style='color: #666666;overflow: hidden;' class="${
						eve.category == 1 ? "hidden" : ""
					}"><span style='display:inline-block;width:6px;height:6px;background-color:#318DDE;border-radius:50%;margin:0 5px;'></span>工作类型： ${
					eve.work
				}</div>
                  <div style='color: #666666;overflow: hidden;' class="${
						eve.category == 1 ? "hidden" : ""
					}"><span style='display:inline-block;width:6px;height:6px;background-color:#318DDE;border-radius:50%;margin:0 5px;'></span>员工职务：${
					eve.role
				}</div>
                  <div style='color: #666666;overflow: hidden;' class="${
						eve.category == 1 ? "hidden" : ""
					}"><span style='display:inline-block;width:6px;height:6px;background-color:#318DDE;border-radius:50%;margin:0 5px;'></span>员工技能：${
					//eve.skill
					skill[eve.role] || "无"
				}</div>
                  <div style='color: #666666;overflow: hidden;' class="${
						eve.category == 1 ? "hidden" : ""
					}"><span style='display:inline-block;width:6px;height:6px;background-color:#318DDE;border-radius:50%;margin:0 5px;'></span>员工分组：${
					eve.event.groupName || "无"
				}</div>
                  <div style='color: #666666;overflow: hidden;' class="${
						eve.category == 0 ? "hidden" : ""
					}"><span style='display:inline-block;width:6px;height:6px;background-color:#318DDE;border-radius:50%;margin:0 5px;'></span>开始时间：${e.event.startStr
					.split("T")[1]
					.split(":")
					.slice(0, 2)
					.join(":")}</div>
                  <div style='color: #666666;overflow: hidden;' class="${
						eve.category == 0 ? "hidden" : ""
					}"><span style='display:inline-block;width:6px;height:6px;background-color:#318DDE;border-radius:50%;margin:0 5px;'></span>结束时间：${e.event.endStr
					.split("T")[1]
					.split(":")
					.slice(0, 2)
					.join(":")}</div>
                </div>
				<div>
					----点击可编辑排班----
				</div>`,
				theme: "light", //主题选取
				// trigger: 'click', //触发类型
				// interactive: true, //可交互的 //别开，有层级Bug，而且依赖父组件也就是日程表的层级，不好改
				placement: "left-end", //悬浮框位置
				allowHTML: true, //是否允许html文本
				zIndex: 9,
			});
		},
		handleEventMouseClick(e) {
			this.$bus.$emit(
				"eidtSchedual",
				e.event._def.extendedProps.event,
				false
			);
		},
		formatStartnEnd(date, time) {
			return {
				start:
					date +
					" " +
					this.fixNum(time.split("--")[0].split(":")[0]) +
					":" +
					time.split("--")[0].split(":")[1],
				end:
					date +
					" " +
					this.fixNum(time.split("--")[1].split(":")[0]) +
					":" +
					time.split("--")[1].split(":")[1],
			};
		},
	},
	computed: {
		scheduleEvents() {
			let scheduleEvents = new Array();
			const colors = this.colors;
			this.events.forEach((event) => {
				scheduleEvents.push({
					event,
					work: event.work || "无",
					role: event.role || "无",
					skill: event.skill || "无",
					title: event.staff || "无",
					color: !event.staff ? colors["未安排"] : colors[event.work],
					...this.formatStartnEnd(event.date, event.time),
				});
			});
			return scheduleEvents;
		},
	},
	watch: {
		events: {
			immediate: true,
			handler: function () {
				this.calendarOption.events = this.scheduleEvents;
			},
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
.fc-time-grid.fc-slats td {
	height: 2.5em;
}
.fc-timegrid-slot {
	line-height: 25px;
}
.fc-event-main-frame {
	line-height: 30px;
}
.fc .fc-toolbar.fc-header-toolbar {
	margin-bottom: 0.5em;
	padding: 15px;
}
.fc-direction-ltr {
	background-color: #fff;
}
.fullcalendar {
	border-radius: 30px 30px 30px 30px;
	box-shadow: 4px 4px 15px #635d5d;
}
</style>
