import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Login from '../pages/Login'
import MainVue from '../pages/MainVue';
import StoreInformation from '../pages/StoreInformation'
import EmployeeProferences from '../pages/EmployeeProferences'
import ForecastData from '../pages/ForecastData'
import Schedule from '../pages/Schedule'
import ScheduleRule from '../pages/ScheduleRule'



export default new VueRouter({
  // mode: history,
  routes: [
    {
      path: '/',
      redirect: 'main'   
    },{
      path: '/main',
      component: MainVue,
      redirect: 'main/store',
      children: [
        {
          name: 'store',
          path: 'store',
          component: StoreInformation,
        },{
          name: 'employee',
          path: 'employee',
          component: EmployeeProferences,
        },{
          name: 'forecastData',
          path: 'forecastData',
          component: ForecastData,
        },{
          name: 'schedule',
          path: 'schedule',
          component: Schedule,
        },{
          name: 'rule',
          path: 'rule',
          component: ScheduleRule,
        }
      ]
    },{
      path: '/login',
      component: Login,
    // },{
    //   path: '/employee',
    //   component: EmployeeProferences,
    }
  ]
})
