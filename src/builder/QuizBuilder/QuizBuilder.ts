import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { availableBlocks } from '../defaults'
import { BlockShelf, BlockShelfItemsRegistry } from '../BlockShelf'
import { BlockEditor } from '../BlockEditor/BlockEditor'
import { Constructor, IBlock, Renderer, Toolbar } from '../modules'
import { QuizBuilderMode } from './QuizBuilder.contracts'

@Component<QuizBuilder>({
  name: 'QuizBuilder',
  components: { Constructor ,BlockShelf, BlockEditor, Toolbar, Renderer },
  created (): void {
    this.qblocks = this.blocks.map(block =>({
      ...block,
      // We add this property here because
      // it is runtime property, we do not want to include it in contract.
      selected: false
    }))

    this.buildBlocks()
  },

  template: `
    <div class="QuizBuilder">
      <!-- Shelf of blocks -->
      <BlockShelf v-if="showBlockShelf" :itemsRegistry="blockCollection" :blocks="qblocks" />
      
      <div class="QuizBuilder__workspace__area">
        <Toolbar :quizCount="quizCount" :pointsCount="pointsCounts"
                 :activeMode.sync="activeMode" @onSave="handleOnSave" />

        <!-- Constructor / Renderer of quizzes -->
        <Constructor v-show="activeMode === mode.Edit" :blocks.sync="qblocks"/>
        <Renderer v-show="activeMode === mode.View" :blocks.sync="qblocks" />
      </div>

      <!-- Editor of block -->
      <BlockEditor :block.sync="selectedBlock" />
    </div>
  `
})
export class QuizBuilder extends Vue {
  /**
   * Blocks to be rendered.
   */
  @Prop({ type: Array, required: true })
  public blocks!: IBlock[]

  /**
   * Registry of blocks.
   */
  @Prop({ type: Object, required: false, default: () => ({}) })
  public blockShelfItems!: BlockShelfItemsRegistry

  /**
   * Determines whether QuizBuilder should be displayed with shelf.
   */
  @Prop({ type: Boolean, required: false, default: true })
  public readonly showBlockShelf!: boolean

  public qblocks: IBlock[] = []

  public readonly mode = QuizBuilderMode

  public activeMode: QuizBuilderMode = QuizBuilderMode.Edit

  /**
   * Collection of default and custom blocks to be passed to shelf.
   */
  public get blockCollection (): BlockShelfItemsRegistry {
    return {
      ...availableBlocks,
      ...this.blockShelfItems
    }
  }

  public get quizCount (): number {
    return this.qblocks.length
  }

  /**
   * Handles onSave event of Constructor.
   */
  public handleOnSave (): void {
    this.$emit('onSave', this.qblocks)
  }

  /**
   * Determines if there selected block in blocks.
   */
  public get hasSelectedBlock (): boolean {
    return this.qblocks.some((block: IBlock) => block.selected)
  }

  public get pointsCounts (): number {
    return this.qblocks.reduce((acc, nextBlock) => {
      return acc + Number(nextBlock.points)
    }, 0)
  }

  /**
   * Determines selected block.
   */
  public get selectedBlock (): IBlock | undefined {
    if (!this.hasSelectedBlock) {
      return
    }

    return this.qblocks.filter((block: IBlock) => block.selected)[0]
  }

  /**
   * Builds and sorts "inner" blocks
   */
  private buildBlocks (): void {
    this.qblocks = this.blocks.sort((a, b) => {
      return a.order - b.order
    })
  }
}
export default QuizBuilder