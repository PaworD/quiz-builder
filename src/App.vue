<template>
  <div class="app">
    <Auth />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Auth from './views/Auth.vue'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component({ name: 'App', components: { Auth }})
export class App extends Vue {

  // public get mockBlocks (): IBlock[] {
  //   return [
  //     {
  //       id: uuidv4(),
  //       type: 'multipleChoice',
  //       title: '1',
  //       order: 0,
  //       points: 2,
  //       content: {
  //         question: 'What do you call a computer on a network that requests files from another computer?',
  //         variants: ['computer', 'router', 'host'],
  //         answer: 'A'
  //       }
  //     },
  //   ]
  // }

}
export default App
</script>

<style lang="scss">
 .app {
   height: 100vh;
 }
</style>