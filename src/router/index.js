import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
// {
//   path: '/demo01',
//   name: 'demo01',
//   component: () => import('@/components/demo-01')
// },
const routes = [
  {path:'/',redirect:'/index'},
  {path:'/index',component: () => import('@/views/index')}
]

const router = new VueRouter({
  routes
})

export default router
