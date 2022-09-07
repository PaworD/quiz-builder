import { Component, Prop, Vue } from 'vue-property-decorator'
import { TrashIcon } from '@/builder/shared'
import { AnyObject, BlockSize } from '@/builder'

/**
 * Block component.
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<Block>({
  name: 'Block',
  components: { TrashIcon },
  template: `
    <div class="Block" :class="[{'--selected': selected}]" :style="size" :id="id" @click="markAsSelected"
         @dragstart="onDragStart" @dragleave="onDragLeave" @dragenter="onDragEnter">
    
    <div class="Block__actions">
      <button @click="removeBlock">
        <TrashIcon />
      </button>
    </div>
      <!-- Title -->
      <h5 v-if="hasTitle">
        {{ title }}
      </h5>
      <!-- End | Title -->
    </div>
  `
})
export class Block extends Vue {
  /**
   * @see BlockData.id
   */
  @Prop({ type: String, required: true })
  public readonly id!: string

  /**
   * @see BlockData.icon
   */
  @Prop({ type: String, required: false, default: 'icon-default' })
  public readonly icon!: string

  /**
   * @see BlockData.order
   */
  @Prop({ type: Number, required: true})
  public readonly order!: number

  /**
   * @see BlockData.selected
   */
  @Prop({ type: Boolean, required: false, default: false })
  public readonly selected?: boolean

  /**
   * @see BlockData.title
   */
  @Prop({ type: String, required: false, default: '' })
  public readonly title?: string

  @Prop({ type: Object, required: true })
  public blockSize!: BlockSize

  /**
   * Determines whether block has title to render.
   */
  public get hasTitle (): boolean {
    return this.title !== null && typeof this.title !== 'undefined' && this.title.length > 0
  }

  public get size (): AnyObject {
    return {
      gridColumn: `span ${this.blockSize.cols}`,
      gridRow: `span ${this.blockSize.rows}`
    }
  }

  /**
   * Selects the current `Block`.
   */
  public markAsSelected (): void {
    this.$emit('markAsSelected')
  }

  /**
   * @see DragEvent
   */
  public onDragEnter (): void {
    this.$el.classList.add('drag-over')
  }

  /**
   * @see DragEvent
   */
  public onDragLeave (): void {
    this.$el.classList.remove('drag-over')
  }

  /**
   * @see DragEvent
   *
   * @param event - DragEvent
   */
  public onDragStart (event: DragEvent): void {
    this.$emit('dragstart', event)
  }

  /**
   * Emits @onRemove event.
   */
  public removeBlock (): void {
    this.$emit('onRemove', this.id)
  }
}
export default Block