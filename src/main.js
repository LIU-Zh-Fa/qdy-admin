import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss'
import '@/assets/styles/ruoyi.scss'
import '@/assets/styles/common.scss'

import App from './App'
import store from './store'
import router from './router'
import i18n from './lang' // 国际化

import './lazyuse' // 全局挂载

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   store,
//   i18n,
//   render: h => h(App)
// })
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
