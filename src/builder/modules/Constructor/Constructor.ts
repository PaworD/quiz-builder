import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { v4 as uuidv4 } from 'uuid'

import { Block, IBlock } from '@/builder/modules'

import { AnyObject } from '@/builder/helpers'

import { ContainerBlock } from '../ContainerBlock'

/**
 *
 * TODO: Documentation.
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<Constructor>({
  name: 'Constructor',
  components: { Block, ContainerBlock },
  template: `
    <div class="Pole" :class="[className]" :id="id"
         @drop="onDrop" @dragover.prevent>

    <!-- Fallback value -->
    <h2 v-if="!_containers.length">
      Drag the elements from the shelf.
    </h2>

    <ContainerBlock v-for="(container, index) in _containers" :key="container.id" :data-index="index"
                    :selected="container.selected" @update:container="onContainerUpdate" :container="container"
                    @selectContainer="markAsSelected" @onChildSelect="onSelectChild" :blocks.sync="_blocks" @dragstart="(event) => startDrag(event)"
                    @removeChild="removeBlock" draggable="true" />
    </div>
  `
})
export class Constructor extends Vue {
  /**
   * @see PoleData._blocks
   */
  @PropSync('blocks', { type: Array, required: true })
  public _blocks!: IBlock[]

  @PropSync('containers', { type: Array, required: true })
  public _containers!: IBlock[]

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
    this._blocks = this._blocks.map((block) => {
      return {
        ...block,
        selected: false
      }
    })

    this._containers = this._containers.map(block => {
      return {
        ...block,
        selected: block.id === id
      }
    })
  }

  public onContainerUpdate (block: IBlock): void {
    const containersCopy = [...this._containers]

    this._containers = containersCopy.map((container) => {
      if (container.id === block.id) {
        return {
          ...block
        }
      }
      return container
    })
  }

  /**
   * OnDrop event.
   */
  public onDrop (event: DragEvent): void {
    if (!event.dataTransfer) {
      return
    }

    const blockEl = event.target as Element

    if (!blockEl) return

    // Expect new Block from shelf.
    // TODO: Make more strong condition to check.
    if (event.dataTransfer.getData('new-block') && event.dataTransfer.getData('new-block').length > 0) {
      const block: IBlock = JSON.parse(event.dataTransfer.getData('new-block'))
      if (block.type.includes('-container')) {
        this._containers.push({
          ...block,
          order: this._containers.length + 1,
          content: {
            children: []
          }
        })
      }
    }

    if (!blockEl.closest('div[container=true]')) {
      console.log('Could not find any closest elements with tag <div>')
      return
    }

    const dragIndex = blockEl.closest('div[container=true]')!.getAttribute('data-index')
    const startIndex = event.dataTransfer.getData('start-index')

    this.swapContainers(Number(startIndex), Number(dragIndex))

    blockEl.classList.remove('drag-over')
  }


  public onSelectChild (): void {
    this._containers = this._containers.map((container) => {
      return {
        ...container,
        selected: false
      }
    })
  }

  public removeBlock (id: string): void {
    this._blocks = this._blocks.filter((block) => {
      return block.id !== id
    }).map((block, index) => {
      return {
        ...block,
        order: index + 1
      }
    })
  }

  /**
   * OnDragStart event.
   */
  public startDrag (event: DragEvent): void {
    if (!event.dataTransfer) {
      return
    }

    const blockEl = event.target as Element

    if (!blockEl) return

    if (!blockEl.closest('div[container=true]')) {
      console.log('Could not find any closest elements with tag <div>')
    }

    let dragStartIndex: string | null = blockEl.closest('div[container=true]')!.getAttribute('data-index')

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
  private swapContainers (startIndex: number, draggedIndex: number): void {
    const containersCopy = [...this._containers]

    const start = containersCopy[startIndex].order
    containersCopy[startIndex].order = containersCopy[draggedIndex].order
    containersCopy[draggedIndex].order = start

    this._containers = containersCopy.sort((a, b) => {
      return a.order - b.order
    })
  }
}

export default Constructor
