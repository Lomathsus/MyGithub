import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import utils from './utils/index' //引入工具

Vue.config.productionTip = false;

Vue.use(utils); // 注册工具

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
