import { VueConstructor } from 'vue'
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import { blocksUiRegistry, PossibleElements } from '@/builder/defaults'
import { IBlock } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'Renderer',
  template: `
    <div class="Renderer">
      <div :class="[listClassName]">
        <component v-for="block in _blocks" :is="component(block.type)" :uiData.sync="block.content" :type="block.type" :key="block.id" />
      </div>
    </div>
  `
})
export class Renderer extends Vue {
  /**
   * Registry of the UI components.
   */
  @Prop({ type: Object, required: false, default: () => blocksUiRegistry })
  private readonly uiRegistry!: Record<PossibleElements, VueConstructor>

  @Prop({ type: String, required: false, default: '' })
  public readonly listClassName?: string

  @PropSync('blocks', { type: Array, required: true })
  public _blocks!: IBlock[]

  /**
   * Determines the applicable component to quiz's type.
   * @param type - type of the quiz.
   */
  public component (type: string): VueConstructor {
    return this.uiRegistry[type as PossibleElements]
  }
}
export default Renderer
