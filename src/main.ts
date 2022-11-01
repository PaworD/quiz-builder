import 'reflect-metadata'
import Vue from 'vue'

import App from './App.vue'
import Antd from 'ant-design-vue';
import store from './store'
import initContainer from './app.containers'

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(Antd)

// Initializes IoC with necessary services.
initContainer()

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
