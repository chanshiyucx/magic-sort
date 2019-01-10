import Vue from 'vue'
import App from './App.vue'
import 'iview/dist/styles/iview.css'
import './assets/style/layout.less'
import './assets/style/reset.less'
import './assets/prism/prism.less'

import { Tabs, TabPane } from 'iview'
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
