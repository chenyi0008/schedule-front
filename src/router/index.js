import Vue from 'vue';
import VueRouter from 'vue-router';
import mainVue from '@/components/mainVue.vue';
import employeePreferences from '@/components/employeePreferences.vue';
import forecastData from '@/components/forecastData.vue';
import shiftScheduling from '@/components/shiftScheduling.vue';
import shiftschedulingRule from '@/components/shiftschedulingRule.vue';


Vue.use(VueRouter)


const router =new VueRouter({

    routes: [{
        path:'/home',
        component:mainVue,//门店信息，初始页面
        children:[
        { path: 'employeePreferences',name:'employeePreferences' ,component: employeePreferences },//员工偏好
        { path: 'forecastData',name:'forecastData' ,component: forecastData },//预测数据
        { path: 'shiftScheduling',name:'shiftScheduling' ,component: shiftScheduling },//排班
        { path: 'shiftschedulingRule',name:'shiftschedulingRule' ,component: shiftschedulingRule },//排班规则
      ]
    
    
}]})


export default router