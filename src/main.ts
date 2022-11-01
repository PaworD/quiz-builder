import 'reflect-metadata'
import Vue from 'vue'

import App from './App.vue'
import store from './store'
import initContainer from './app.containers'

Vue.config.productionTip = false

// Initializes IoC with necessary services.
initContainer()

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
