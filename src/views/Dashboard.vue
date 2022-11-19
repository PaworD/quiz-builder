<template>
    <a-layout>
      <a-layout-sider theme="light" width="300">
        <a-menu theme="light" mode="inline" :selected-keys="[selectedMenuKey]" @select="onMenuSelect">
          <a-menu-item key="quizes">
            <router-link :to="{ name: 'quiztable' }">
              <a-icon type="project" />
              <span>Quizes</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="logout" style="padding-left: 20px !important;">
            <a-icon type="login" />
            <span>Logout</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <Header />
        <a-layout-content>
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { AuthMixin } from '../mixins/AuthMixin'
import { Header } from '../components/Header.vue'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<Dashboard>({
  name: 'Dashboard',
  components: { Header }
})
export class Dashboard extends Mixins<AuthMixin>(AuthMixin) {
  public selectedMenuKey = ''

  public onMenuSelect (item: any): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this

    switch (item.key) {
      case 'quizes':
        this.selectedMenuKey = item.key
        break
      case 'logout':
        this.$confirm({
          cancelText: 'Cancel',
          content: 'Do you want to logout?',
          async onOk (): Promise<void> {
            localStorage.removeItem('token')
            await self.signOut()
            await self.$router.push({ name: 'auth' })
          }
        })
    }
  }
}
export default Dashboard
</script>
