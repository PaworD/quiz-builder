<template>
  <div class="app">
    <router-view v-if="isLogged" />
    <Auth v-else />
    <FullscreenLoader v-if="isLoading" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator'

import FullscreenLoader from './components/FullscreenLoader.vue'
import { AuthMixin } from './mixins/AuthMixin'

import { Auth } from './views/Auth.vue'
import { Dashboard } from './views/Dashboard.vue'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<App>({
  name: 'App',
  components: { Dashboard, Auth, FullscreenLoader },
  mounted (): void {
    this.isLoading = true
    this.authRepository.authorize().then(value => {
      this.$store.commit('SET_LOGGED_IN', value)
    }).finally(() => this.isLoading = false)
  }
})
export class App extends Mixins<AuthMixin>(AuthMixin) {
  protected isLoading = false
}
export default App
</script>

<style lang="scss">
 .app {
   height: auto;
 }
</style>