import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import _ from 'lodash'

import { Block, IBlock } from '../Block'
import { AnyObject } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<ContainerBlock>({
  name: 'ContainerBlock',
  components: { Block },
  template: `
    <div class="ContainerBlock" :style="size" :id="_container.id" :class="{ '--selected': selected }"
         @drop="onDrop" @dragstart="onContainerDrag" container="true">
      <div v-if="_container && containerElements.length > 0" class="ContainerBlock__children">
        <Block v-for="(block, index) in containerElements" :key="block.id" @markAsSelected="selectChild(block.id)"
               :title="block.title" :order="block.order" :selected="block.selected" :blockSize="block.size"
               :id="block.id" draggable="true" @dragstart="(event) => onDragStart(event, block.id)" :data-index="index"
               @onRemove="removeBlock(block.id)" />
      </div>

      <div v-else />
    
    <button v-if="!selected" class="ContainerBlock__action" @click="markAsSelected"> Edit </button>
    </div>
  `
})
export class ContainerBlock extends Vue {
  @PropSync('blocks', { type: Array, required: true })
  public _blocks!: IBlock[]

  @PropSync('container', { type: Object, required: true })
  public _container!: IBlock
  /**
   * @see BlockData.selected
   */
  @Prop({ type: Boolean, required: false, default: false })
  public readonly selected?: boolean

  public get containerElements (): IBlock[] {
    if (!this._container.content.children) {
      return []
    }
    return this._blocks.filter((block) => {
      return this._container.content.children.includes(block.id)
    })
  }

  public set containerElements (elements: IBlock[]) {

    const bCopy = [ ...this._blocks ]

    for (const element of elements) {
      for (const block of bCopy) {
          this._blocks = _.map(bCopy, (_block) => {
            return _block.id === element.id ? block : _block;
          })
      }
    }
  }

  public get size (): AnyObject {
    return {
      gridColumn: `span ${this._container.size.cols}`,
      gridRow: `span ${this._container.size.rows}`
    }
  }

  public markAsSelected (): void {
    this.$emit('selectContainer', this._container.id)
  }

  public selectChild (id: string): void {
    this.$emit('onChildSelect')
    this._blocks = this._blocks.map(block => {
      return {
        ...block,
        selected: block.id === id
      }
    })
  }

  public onContainerDrag (event: DragEvent): void {
    this.$emit('dragstart', event)
  }

  /**
   * @see DragEvent
   *
   * @param event - DragEvent
   */
  public onDragStart (event: DragEvent, id: string): void {
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
      console.log('Cannot find any closest divs, resetting to first index...')

      dragStartIndex = '0'
    }

    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('start-index', dragStartIndex)
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
      const block: IBlock = JSON.parse(event.dataTransfer.getData('new-block'))

      block.order = this._container.content.children ? this._container.content.children.length + 1 : 0

      if (!(block.type.includes('-container'))) {
        this._container.content.children.push(block.id)

        this._blocks.push(block)

        this.selectChild(block.id)

        const blockEl = event.target as Element

        if (!blockEl) return

        if (!blockEl.closest('div')) {
          console.log('Could not find any closest elements with tag <div>')
        }

        const dragIndex = blockEl.closest('div')!.getAttribute('data-index')
        const startIndex = event.dataTransfer.getData('start-index')

        this.$nextTick(() => {
          this.swapBlockItems(Number(startIndex), Number(dragIndex))
        })

        blockEl.classList.remove('drag-over')
      }
    }
  }

  public removeBlock (id: string): void {
    const containerCopy = { ...this._container }

    containerCopy.content.children = containerCopy.content.children.filter((child: IBlock) => {
      return child.id !== id
    })

    this.$emit('removeChild', id)
  }

  /**
   * Swaps order of blocks
   *
   * @param startIndex - starting place of a block
   * @param draggedIndex - destination place of block
   */
  private swapBlockItems (startIndex: number, draggedIndex: number): void {

    const blocksCopy = [...this.containerElements]
    const start = blocksCopy[startIndex].order
    blocksCopy[startIndex].order = blocksCopy[draggedIndex].order
    blocksCopy[draggedIndex].order = start

    this.containerElements = blocksCopy.sort((a: IBlock, b: IBlock) => {
      return a.order - b.order
    })
  }
}

export default ContainerBlock
