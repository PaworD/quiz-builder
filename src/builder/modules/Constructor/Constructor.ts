import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { v4 as uuidv4 } from 'uuid'

import { Block, IBlock } from '@/builder/modules'

import { AnyObject } from '@/builder/helpers'

/**
 *
 * TODO: Documentation.
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<Constructor>({
  name: 'Constructor',
  components: { Block },
  template: `
    <div class="Pole" :class="[className]" :id="id"
         @drop="onDrop" @dragover.prevent>
    
    <!-- Fallback value -->
    <h2 v-if="!_blocks.length">
      Drag the block from the shelf.
    </h2>

    <!-- Individual Blocks -->
      <Block v-for="(block, index) in _blocks" :key="block.id" @markAsSelected="markAsSelected(block.id)"
             :version="block.version" :title="block.title" :order="block.order" :selected="block.selected"
             :id="block.id" draggable="true" @dragstart="(event) => startDrag(event, block.id)" :data-index="index"
             @onRemove="removeBlock"/>
    </div>
  `
})
export class Constructor extends Vue {
  /**
   * @see PoleData._blocks
   */
  @PropSync('blocks', { type: Array, required: true })
  public _blocks!: IBlock[]

  /**
   * @see PoleData.className
   */
  @Prop({ type: Object, required: false, default: () => ({}) })
  public readonly className?: AnyObject

  /**
   * Id for the pole, to pass as HTML attr.
   */
  public get id (): string {
    return `constructor-${uuidv4()}`
  }

  /**
   * Marks passed-in block as selected.
   * @param id - ID of the block.
   */
  public markAsSelected (id: string): void {
    this._blocks = this._blocks.map(block => {
      return {
        ...block,
        selected: block.id === id
      }
    })
  }

  /**
   * OnDrop event.
   */
  public onDrop (event: DragEvent): void {
    if (!event.dataTransfer) {
      return
    }

    // Expect new Block from shelf.
    // TODO: Make more strong condition to check.
    if (event.dataTransfer.getData('new-block') && event.dataTransfer.getData('new-block').length > 0) {
      this._blocks.push(JSON.parse(event.dataTransfer.getData('new-block')))
    }

    const blockEl = event.target as Element

    if (!blockEl) return

    if (!blockEl.closest('div')) {
      console.log('Could not find any closest elements with tag <div>')
    }

    const dragIndex = blockEl.closest('div')!.getAttribute('data-index')
    const startIndex = event.dataTransfer.getData('start-index')

    this.swapBlockItems(Number(startIndex), Number(dragIndex))

    blockEl.classList.remove('drag-over')
  }

  public removeBlock (id: string): void {
    this._blocks = this._blocks.filter((block) => {
      return block.id !== id
    })
  }

  /**
   * OnDragStart event.
   */
  public startDrag (event: DragEvent, id: string): void {
    if (!event.dataTransfer) {
      return
    }

    const blockEl = event.target as Element

    if (!blockEl) return

    if (!blockEl.closest('div')) {
      console.log('Could not find any closest elements with tag <div>')
    }

    let dragStartIndex: string | null = blockEl.closest('div')!.getAttribute('data-index')

    if (!dragStartIndex) {
      console.error('Cannot find any closest divs, resetting to first index...')

      dragStartIndex = '0'
    }

    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('start-index', dragStartIndex)
  }

  /**
   * Swaps order of blocks
   *
   * @param startIndex - starting place of a block
   * @param draggedIndex - destination place of block
   */
  private swapBlockItems (startIndex: number, draggedIndex: number): void {
    const blocksCopy = [...this._blocks]

    const start = blocksCopy[startIndex].order
    blocksCopy[startIndex].order = blocksCopy[draggedIndex].order
    blocksCopy[draggedIndex].order= start

    this._blocks = blocksCopy.sort((a, b) => {
      return a.order - b.order
    })
  }
}
export default Constructor
