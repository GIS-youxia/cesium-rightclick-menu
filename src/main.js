import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/icons/iconfont.css'
import './assets/icons/iconfont.js'

new Vue({
  render: h => h(App),
}).$mount('#app')
