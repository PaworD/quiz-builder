import { VueConstructor } from 'vue'
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import { blocksUiRegistry, QuizType } from '@/builder/defaults'
import { IBlock } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'Renderer',
  template: `
    <div class="Renderer">
      <div :class="[listClassName]">
        <component v-for="block in _blocks" :is="component(block.version)" :data.sync="block.content" :version="block.version" :key="block.id" />
      </div>
    </div>
  `
})
export class Renderer extends Vue {
  /**
   * Registry of the UI components.
   */
  @Prop({ type: Object, required: false, default: () => blocksUiRegistry })
  private readonly uiRegistry!: Record<QuizType, VueConstructor>

  @Prop({ type: String, required: false, default: '' })
  public readonly listClassName?: string

  @PropSync('blocks', { type: Array, required: true })
  public _blocks!: IBlock[]

  public component (type: string): VueConstructor {
    return this.uiRegistry[type as QuizType]
  }
}
export default Renderer