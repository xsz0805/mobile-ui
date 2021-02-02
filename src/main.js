import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myButton from '@/components/my-button/my-button'
import mybadge from '@/components/my-badge/my-badge'
import myicon from '@/components/my-icon/my-icon'
import mysearch from '@/components/my-search/my-search'
import mystep from '@/components/my-step/my-step'
import myprogress from '@/components/my-progress/my-progress'
import mycircle from '@/components/my-circle/my-circle'
import mytree from '@/components/my-tree/my-tree'
import itemtree from '@/components/my-tree/my-tree-item'
import myloading from '@/components/my-loading/my-loading'
import mycaptcha from '@/components/my-captcha/my-captcha'
// import 'lib-flexible/flexible'
import "amfe-flexible";
import Vant from 'vant';
import 'vant/lib/index.css';
import lottie from 'vue-lottie';
Vue.component('lottie', lottie)

Vue.use(Vant);
Vue.config.productionTip = false
Vue.component('myButton', myButton)
Vue.component('mybadge', mybadge)
Vue.component('myicon', myicon)
Vue.component('mysearch', mysearch)
Vue.component('mystep', mystep)
Vue.component('myprogress', myprogress)
Vue.component('mycircle', mycircle)
Vue.component('mytree', mytree)
Vue.component('itemtree', itemtree)
Vue.component('myloading', myloading)
Vue.component('mycaptcha', mycaptcha)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
