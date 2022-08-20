<template>
  <div id="app">
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
      // {
      //   id: uuidv4(),
      //   version: 'basic',
      //   title: 'Basic Block',
      //   order: 0,
      //   points: 0,
      //   content: {
      //     question: 'This is question from API',
      //     answer: 'This is answer from API'
      //   }
      // },
    ]
  }
  public onSave (blocks: any): void {
    console.log(blocks)
  }
}
export default App
</script>

<style lang="scss">
 * {
   //
 }
</style>