import VueRouter from "vue-router";
import RegisterView from "../pages/RegisterView";
import LoginView from "../pages/LoginView";
import MainVue from "../pages/MainVue";
import StoreInformation from "../pages/StoreInformation";
import EmployeeProferences from "../pages/EmployeeProferences";
import ForecastData from "../pages/ForecastData";
import Schedule from "../pages/Schedule_new";
import ScheduleRule from "../pages/ScheduleRule";
import Group from "../pages/Group";

import storage from "@/storage";

const routes = [
	{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/login",
		name: "loginView",
		component: LoginView,
	},
	{
		path: "/register",
		name: "RegisterView",
		component: RegisterView,
	},
	{
		path: "/main",
		component: MainVue,
		redirect: "main/store",
		meta: {
			requireAuth: true,
		},
		children: [
			{
				name: "store",
				path: "store",
				meta:{title:"门店管理"},
				component: StoreInformation,
			},
			{
				name: "employee",
				path: "employee",
				meta:{title:"员工数据"},
				component: EmployeeProferences,
			},
			{
				name: "forecastData",
				path: "forecastData",
				meta:{title:"预测数据"},
				component: ForecastData,
			},
			{
				name: "schedule",
				path: "schedule",
				meta:{title:"排班"},
				component: Schedule,
			},
			{
				name: "rule",
				path: "rule",
				meta:{title:"排班规则"},
				component: ScheduleRule,
			},
			{
				name: "group",
				path: "group",
				meta:{title:"员工分组"},
				component: Group,
			},

		],
	},
];

const router = new VueRouter({
	// mode: history,
	routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
	// to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
	if (to.matched.some((r) => r.meta.requireAuth) !== false) {
		let tokenInfo = storage.get("token");
		if (tokenInfo) {
			console.log("已登陆");
			next();
		} else {
			console.log("未登陆");
			storage.remove("token");
			next({
				path: "/login",
				query: {
					redirect: to.fullPath,
				}, // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
			});
		}
	} else {
		next();
	}
});

export default router;
