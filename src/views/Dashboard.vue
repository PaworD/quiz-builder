<template>
    <a-layout>
      <a-layout-sider theme="light" width="300">
        <a-menu theme="light" mode="inline" :default-selected-keys="['1']">
          <a-menu-item key="1">
            <a-icon type="project" />
            <span>Quizes</span>
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
import { Component, Vue } from 'vue-property-decorator'

import { Header } from '../components/Header.vue'

@Component<Dashboard>({
  name: 'Dashboard',
  components: { Header }
})
export class Dashboard extends Vue {

  public openQuiz (): void {
    this.$router.push({
      name: 'quiz.builder',
      params: {
        id: 'one'
      }
    })
  }

  public openQuizViewer (): void {
    this.$router.push({
      name: 'quiz.viewer',
      params: {
        id: 'one'
      }
    })
  }
}
export default Dashboard
</script>
