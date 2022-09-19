import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import _ from 'lodash'

import { availableElements, PossibleElements } from '../defaults'
import { BlockShelf, BlockShelfItemsRegistry } from '../BlockShelf'
import { BlockEditor } from '../BlockEditor/BlockEditor'
import { Constructor, IBlock, Renderer, Toolbar } from '../modules'
import { QuizBuilderMode } from './QuizBuilder.contracts'
import { availableContainers, PossibleContainer } from '@/builder/defaults/containers'

@Component<QuizBuilder>({
  name: 'QuizBuilder',
  components: { Constructor ,BlockShelf, BlockEditor, Toolbar, Renderer },
  created (): void {
    this.qblocks = this.blocks.map(block =>({
      ...block,
      selected: false
    }))

    this.qContainers = this.containers.map(container => ({
      ...container,
      selected: false
    }))

    this.buildBlocks()
    this.buildContainers()
  },

  template: `
    <div class="QuizBuilder">
      <!-- Shelf of blocks -->
      <BlockShelf v-if="showBlockShelf" :itemsRegistry="blockCollection" :containersRegistry="containersCollection" />
      
      <div class="QuizBuilder__workspace__area">
        <Toolbar :activeMode.sync="activeMode" @onSave="handleOnSave" />
        
        <!-- Constructor / Renderer of quizzes -->
        <Constructor v-show="activeMode === mode.Edit" :blocks.sync="qblocks" :containers.sync="qContainers" />
        <Renderer v-show="activeMode === mode.View" :blocks.sync="qblocks" :containers.sync="qContainers" />
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

  @Prop({ type: Array, required: true })
  public containers!: IBlock[]

  /**
   * Determines whether QuizBuilder should be displayed with shelf.
   */
  @Prop({ type: Boolean, required: false, default: true })
  public readonly showBlockShelf!: boolean

  public qblocks: IBlock[] = []
  public qContainers: IBlock[] = []

  public readonly mode = QuizBuilderMode

  public activeMode: QuizBuilderMode = QuizBuilderMode.Edit

  /**
   * Collection of default and custom blocks to be passed to shelf.
   */
  public get blockCollection (): BlockShelfItemsRegistry<PossibleElements> {
    return {
      ...availableElements
    }
  }

  public get containersCollection (): BlockShelfItemsRegistry<PossibleContainer> {
    return {
      ...availableContainers
    }
  }

  public get allBlocks (): IBlock[] {
    return _.values(_.merge(
      _.keyBy(this.qblocks, 'id'),
      _.keyBy(this.qContainers, 'id')
    ));
  }

  /**
   * Handles onSave event of Constructor.
   */
  public handleOnSave (): void {
    this.$emit('onSave', { elements: this.qblocks, containers: this.qContainers })
  }

  /**
   * Determines if there selected block in blocks.
   */
  public get hasSelectedBlock (): boolean {
    return this.allBlocks.some((block: IBlock) => block.selected)
  }

  /**
   * Determines selected block.
   */
  public get selectedBlock (): IBlock | undefined {
    if (!this.hasSelectedBlock) {
      return
    }

    return this.allBlocks.filter((block: IBlock) => block.selected)[0]
  }

  /**
   * Builds and sorts "inner" blocks
   */
  private buildBlocks (): void {
    this.qblocks = this.blocks.sort((a, b) => {
      return a.order - b.order
    })
  }

  private buildContainers (): void {
    this.qContainers = this.containers.sort((a, b) => {
      return a.order - b.order
    })
  }

  @Watch('blocks')
  protected onBlock (): void {
    this.buildBlocks()
  }

  @Watch('containers')
  protected onContainers (): void {
    this.buildContainers()
  }
}
export default QuizBuilder