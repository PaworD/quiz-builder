<template>
  <div class="app">
    <QuizBuilder :blocks="mockBlocks" @onSave="onSave" />
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
    return [
      {
        id: uuidv4(),
        type: 'multipleChoice',
        title: '1',
        order: 0,
        size: {
          rows: 12,
          cols: 6
        },
        content: {
          question: 'What do you call a computer on a network that requests files from another computer?',
          variants: ['computer', 'router', 'host'],
          answer: 'A'
        }
      },
    ]
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