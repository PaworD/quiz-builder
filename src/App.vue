<template>
  <div class="app">
    <QuizBuilder :blocks="elements" :containers="containers" @onSave="onSave" />
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
  public get elements (): IBlock[] {
    return [
      {
        "id": "20ad2f50-43de-4dc3-814d-43f7f175aa43",
        "title": "button",
        "order": 1,
        "content": {
          "action": "link",
          "disabled": false,
          "isLoading": false,
          "label": "I am first button",
          "shape": "rectangle",
          "theme": "primary",
          "variant": "full"
        },
        "size": {
          "cols": 2,
          "rows": 2
        },
        "type": "button",
        "selected": false
      }
    ]
  }

  public get containers (): IBlock[] {
    return [
      {
        "id": "00d9f11e-a6e7-4d04-af09-6749d0cfd6a1",
        "title": "flex-container",
        "order": 1,
        "content": {
          "children": [
            "20ad2f50-43de-4dc3-814d-43f7f175aa43"
          ]
        },
        "size": {
          "cols": 12,
          "rows": 0
        },
        "type": "flex-container",
        "selected": false
      }
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
