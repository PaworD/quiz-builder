<template>
  <div class="app">
    <QuizBuilder :blocks="mockBlocks" :containers="[]" @onSave="onSave" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { v4 as uuidv4 } from 'uuid'

import { QuizBuilder } from '@/builder/QuizBuilder'
import { IBlock } from '@/builder/modules/Block'

/**
 *
 * ...
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component({ name: 'App', components: { QuizBuilder }})
export class App extends Vue {

  public get mockBlocks (): IBlock[] {
    return []
  }

  public onSave (blocks: any): void {
    console.log(blocks)
  }
}
export default App
</script>

<style lang="scss">
 .app {
   height: 100vh;
 }
</style>
