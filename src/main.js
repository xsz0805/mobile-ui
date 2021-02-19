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
import mypoints from '@/components/my-captcha/my-points'
import mycompute from '@/components/my-captcha/my-compute'
import myslide from '@/components/my-captcha/my-slide'
import mymessage from '@/components/my-captcha/my-message'
import myscan from '@/components/my-scan/my-scan'
import myupload from '@/components/my-upload/my-upload'
import mycode from '@/components/my-captcha/my-code'
import mymap from '@/components/my-map/my-map'
import dingwei from '@/components/my-map/dingwei'
// import yourMap from '@/components/my-map/Map.vue'

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
Vue.component('mypoints', mypoints)
Vue.component('mycompute', mycompute)
Vue.component('myslide', myslide)
Vue.component('mymessage', mymessage)
Vue.component('myscan', myscan)
Vue.component('myupload', myupload)
Vue.component('mycode', mycode)
Vue.component('mymap', mymap)
Vue.component('dingwei', dingwei)
// Vue.component('yourMap', yourMap)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
