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
  {path:'/index',component: () => import('@/views/index')},
  {path:'/scan',component: () => import('@/views/scan')},
  {path:'/tree',component: () => import('@/views/tree')},
  {path:'/captcha',component: () => import('@/views/captcha')},
  {path:'/map',component: () => import('@/views/map')},

  // {path:'/scanPage',component: () => import('@/components/my-scan/scanPage')},
  // {path:'/tree',component: () => import('@/views/tree')}  
]

const router = new VueRouter({
  routes
})

export default router
