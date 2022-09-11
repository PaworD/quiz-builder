import { Component, Prop, Vue } from 'vue-property-decorator'
import { v4 as uuid } from 'uuid'

import { BlockSize, IBlock } from '@/builder'

import { BlockShelfItemsRegistry } from './BlockShelf.contracts'
import { ContainersRegistry } from '@/builder/defaults/containers'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'BlockShelf',
  template: `
    <div class="Shelf">

        <span class="Shelf__info-stripe">
          Containers
        </span>
        <ul v-if="hasItems">
          <li v-for="(block, index) in containersRegistry" :key="index" draggable="true" @dragstart="(e) => onItemDrag(e, block.type, block.size)">
            <div>
              {{ block.title }}
            </div>
            <span>
              {{ block.type }}
            </span>
          </li>
        </ul>
        
        <span class="Shelf__info-stripe">
          Components
        </span>
        <ul v-if="hasItems">
          <li v-for="(block, index) in itemsRegistry" :key="index" draggable="true" @dragstart="(e) => onItemDrag(e, block.type, block.size)">
            <div>
              {{ block.title }}
            </div>
            <span>
              {{ block.type }}
            </span>
          </li>
        </ul>
    </div>
  `
})
export class BlockShelf extends Vue {
  @Prop({ type: Object, required: false, default: () => ({}) })
  public itemsRegistry?: BlockShelfItemsRegistry

  @Prop({ type: Object, required: false, default: () => ({}) })
  public containersRegistry?: ContainersRegistry

  /**
   * Determines whether any item to render.
   */
  public get hasItems (): boolean {
    if (!this.itemsRegistry) {
      return false
    }

    return Object.keys(this.itemsRegistry).length > 0
  }

  public onItemDrag (event: DragEvent, type: string, size: BlockSize): void {
    if (!event.dataTransfer) {
      return
    }

    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'

    const newBlock: IBlock = {
      id: uuid(),
      title: type,
      order: 1,
      content: {},
      size,
      type
    }

    event.dataTransfer.setData('new-block', JSON.stringify(newBlock))
  }
}
export default BlockShelf