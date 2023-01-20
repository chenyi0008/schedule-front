import VueRouter from 'vue-router'
import RegisterView from '../pages/RegisterView'
import LoginView from '../pages/LoginView'
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
      redirect: '/login'   
    },
    {
      path: '/login',
      name: 'loginView',
      component: LoginView
    },
    {
      path:'/register',
      name:'RegisterView',
      component:RegisterView
    },
    {
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
    }, 
    
  ]
})
