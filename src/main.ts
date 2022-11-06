import 'reflect-metadata'
import Vue from 'vue'

import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import { store } from './store'
import { router } from './router'

// Register firebase config.
import './firebase.config'

// Initialize the app main IoC container.
import initContainer from './app.containers'

Vue.config.productionTip = false

Vue.use(Antd)

// Initializes IoC with necessary services.
initContainer()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
