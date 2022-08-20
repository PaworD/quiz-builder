import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { IBlock } from '@/builder/modules/Block/Block.contracts'

import { availableBlocks } from '../defaults'
import { BlockShelf, BlockShelfItemsRegistry } from '../BlockShelf'
import { BlockEditor } from '../BlockEditor/BlockEditor'
import { Pole } from '../modules'

@Component<QuizBuilder>({
  name: 'QuizBuilder',
  components: { Pole ,BlockShelf, BlockEditor },
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
      
      <!-- Pole where blocks are rendered -->
      <Pole :blocks.sync="qblocks" @onSave="handlePoleOnSave" />

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

  /**
   * Collection of default and custom blocks to be passed to shelf.
   */
  public get blockCollection (): BlockShelfItemsRegistry {
    return {
      ...availableBlocks,
      ...this.blockShelfItems
    }
  }

  /**
   * Handles onSave event of Pole.
   * @param blocks
   */
  public handlePoleOnSave (blocks: IBlock[]): void {
    this.$emit('onSave', blocks)
  }

  /**
   * Determines if there selected block in blocks.
   */
  public get hasSelectedBlock (): boolean {
    return this.qblocks.some((block: IBlock) => block.selected)
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

  @Watch('blocks')
  protected onBlock (): void {
    this.buildBlocks()
  }
}
export default QuizBuilder