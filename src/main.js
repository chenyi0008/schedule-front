import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import "./assets/global.css";
import storage from "@/storage";

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://113.125.103.168:8085/";
Vue.prototype.$storage = storage;

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");

// new Vue({
//   render: h => h(App),
//   router: router,
// }).$mount('#app')

// new Vue({
//   render:h =>h(mainVue)
// }).$mount('#mainVue')
