import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { VueConstructor } from 'vue-class-component/dist/vue-class-component'

import { blocksFormRegistry, PossibleElements } from '@/builder/defaults'
import { IBlock } from '@/builder'

/**
 *
 * **BLOCK EDITOR**
 *
 * ----
 *
 * @summary This view is responsible to display forms for blocks/pole's/etc.
 *
 * @version 1.0.0-alpha.1
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<BlockEditor>({
  name: 'BlockEditor',
  template: `
    <div class="BlockEditor">
    <div class="BlockEditor__container" v-if="hasBlock">
      <!-- Block's default attributes -->
      <span class="BlockEditor__info-stripe">ESSENTIALS</span>
      <div class="BlockEditor__editor BlockEditor__editor__essentials">
          <span class="t-small block-id">
           <strong>ID: </strong> <span>{{ _block.id }}</span>
          </span>

        <div class="essentials__group">
          <label for="label">Title</label>
          <sui-input type="text" v-model="_block.title" placeholder="Enter title" required />
        </div>

        <div class="essentials__group">
          <label>Width </label>
          <sui-input type="number" max="12" v-model="_block.size.cols" placeholder="Enter width" />
        </div>

        <div class="essentials__group">
          <label>Height </label>
          <sui-input type="number" max="1000" v-model="_block.size.rows"
                     placeholder="Enter height" />
        </div>
      </div>

      <!-- Block's content view -->
      <span class="BlockEditor__info-stripe">BLOCK SETTINGS [{{ _block.type }}]</span>
      <div class="BlockEditor__editor BlockEditor__editor__block-content">
        <component :is="component" :formData.sync="_block.content" :type="_block.type" :key="_block.id" />
      </div>
    </div>

    <div class="BlockEditor__not-found" v-else>
        <span class="t-muted">
          select block
        </span>
    </div>
    </div>
  `
})
export class BlockEditor extends Vue {
  /**
   * Registry of the forms
   */
  @Prop({ type: Object, required: false, default: () => blocksFormRegistry })
  private readonly formRegistry!: Record<PossibleElements, VueConstructor>

  /**
   * Synchronized block.
   */
  @PropSync('block', { type: Object, required: false, default: () => ({}) })
  public _block!: IBlock

  /**
   * Determines component to be rendered for editing selected `Block`
   */
  public get component (): VueConstructor {
    if (!(this._block.type in this.formRegistry)) {
      console.error(`Could not find view for current Block! Got [${this._block.type}]`)
    }

    return this.formRegistry[(this._block.type) as PossibleElements]
  }

  /**
   * Determines whether block is selected & has necessary property to be edited.
   */
  public get hasBlock (): boolean {
    return Object.prototype.hasOwnProperty.call(this._block,'type')
  }
}
export default BlockEditor
