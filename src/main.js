import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import myButton from '@/components/my-button/my-button'
import mybadge from '@/components/my-badge/my-badge'
import myicon from '@/components/my-icon/my-icon'
import mysearch from '@/components/my-search/my-search'
import mystep from '@/components/my-step/my-step'
// import 'lib-flexible/flexible'
import "amfe-flexible"; 
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.config.productionTip = false
Vue.component('myButton',myButton)
Vue.component('mybadge',mybadge)
Vue.component('myicon',myicon)
Vue.component('mysearch',mysearch)
Vue.component('mystep',mystep)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
