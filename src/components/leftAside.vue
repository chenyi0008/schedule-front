<template>
	<div>
		<div class="inPageLogo" @click="loginIn">
			<img src="../assets/img/avatar.svg" alt="" /> MyAdmin
		</div>
		<el-menu
			:default-active="this.$route.path.split('/')[2]"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			background-color="#01182e"
			text-color="#ffEeEf"
			router
		>
			<el-menu-item-group>
				<el-menu-item index="store">门店信息</el-menu-item>
				<el-menu-item index="employee">员工数据</el-menu-item>
				<el-menu-item index="group">员工分组</el-menu-item>
				<el-menu-item index="forecastData">预测数据</el-menu-item>
				<el-menu-item index="rule">排班规则</el-menu-item>
				<el-menu-item index="schedule">生成排班</el-menu-item>
			</el-menu-item-group>
		</el-menu>

		<!-- <el-tabs
      :tab-position="tabPosition"
      @tab-click="changeNav"
      :value="activeTab"
      style="height: 665px
             width:200px"
    >
      <el-tab-pane label="门店信息" name="store">门店信息</el-tab-pane>
      <el-tab-pane label="员工数据" name="employee">员工数据</el-tab-pane>
      <el-tab-pane label="员工分组" name="group">员工分组</el-tab-pane>
      <el-tab-pane label="预测数据" name="forecastData">预测数据</el-tab-pane>
      <el-tab-pane label="排班" name="schedule">排班</el-tab-pane>
      <el-tab-pane label="排班规则" name="rule">排班规则</el-tab-pane>
    </el-tabs> -->
	</div>
</template>

<script scoped>
export default {
	name: "leftAside",

	methods: {
		changeNav(pane) {
			this.$emit("changeNav", pane.label);
			this.$router.push({ name: pane.name });
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		loginIn() {
			this.$router.push("/login");
		},
	},

	data() {
		return {
			activeTab: "store",
			tabPosition: "left",
		};
	},
};
</script>

<style scoped>
::v-deep .el-menu {
	border-right: solid 0px #e6e6e6;
}

::v-deep .el-menu-item {
	font-size: medium;
	font-weight: 700;
}
.el-menu-item.is-active {
	background-color: #409eff !important;
	color: #ffffff;
}

.inPageLogo {
	line-height: 2em;
	font-size: 23px;
	color: #ffffff;
	height: 60px;
}

img {
	height: 36px;
	margin-top: 10px;
}
</style>
