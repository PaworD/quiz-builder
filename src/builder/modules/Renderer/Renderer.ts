import { VueConstructor } from 'vue'
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import { blocksUiRegistry, PossibleElements } from '@/builder/defaults'
import { AnyObject, IBlock } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'Renderer',
  template: `
    <div class="Renderer" :class="[rendererClasses.join(' ')]">
    <component v-for="block in _blocks" :is="component(block.type)" :uiData.sync="block.content"
               :type="block.type" :key="block.id" :style="size(block)" />
    </div>
  `
})
export class Renderer extends Vue {
  @PropSync('blocks', { type: Array, required: true })
  public _blocks!: IBlock[]

  @Prop({ type: String, required: false, default: [] })
  public readonly rendererClasses?: string[]
  /**
   * Registry of the UI components.
   */
  @Prop({ type: Object, required: false, default: () => blocksUiRegistry })
  private readonly uiRegistry!: Record<PossibleElements, VueConstructor>

  /**
   * Determines the applicable component to quiz's type.
   * @param type - type of the quiz.
   */
  public component (type: string): VueConstructor {
    return this.uiRegistry[type as PossibleElements]
  }

  public size (block: IBlock): AnyObject {
    return {
      gridColumn: `span ${block.size.cols}`,
      gridRow: `span ${block.size.rows}`
    }
  }
}

export default Renderer
