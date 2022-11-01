<template>
  <div class="app">
    <Dashboard v-if="isAuth" />
    <Auth v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Auth from './views/Auth.vue'
import Dashboard from './views/Dashboard.vue'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component({ name: 'App', components: { Dashboard, Auth }})
export class App extends Vue {

  public get isAuth (): boolean {
    return this.$store.getters.isAuth
  }

}
export default App
</script>

<style lang="scss">
 .app {
   height: 100vh;
 }
</style>