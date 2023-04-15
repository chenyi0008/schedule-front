import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		storeId: 0,
		staffs: [],
	},
	mutations: {
		updateStaffs(state, val) {
			state.staffs = val;
		},
	},
});

export default store;
