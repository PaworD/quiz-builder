import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { VueConstructor } from 'vue'
import { merge } from 'lodash'

import { blocksFormRegistry, PossibleContainer, PossibleElements } from '@/builder/defaults'
import { IBlock } from '@/builder'
import { containersRegistry } from '@/builder/defaults/containers'
import { Accordion, AccordionItem } from '@/builder/shared/components/Accordion'

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
  components: { Accordion, AccordionItem },
  template: `
    <div class="BlockEditor">
    <div class="BlockEditor__container" v-if="hasBlock">
      <Accordion>
        <template #default="{ accordion }">
          <AccordionItem :config="accordion">
            <!-- This slot will handle the title/header of the accordion and is the part you click on -->
            <template slot="accordion-trigger">
              <p>Basics</p>
            </template>
            <!-- This slot will handle all the content that is passed to the accordion -->
            <template #accordion-content>
              <div class="BlockEditor__editor BlockEditor__editor__essentials">
                <span class="t-small block-id">
                 <strong>ID: </strong> <span>{{ block.id }}</span>
                </span>

                <div class="essentials__group">
                  <label for="label">Title</label>
                  <a-input type="text" v-model="block.title" placeholder="Enter title" size="large" required
                           allow-clear />
                </div>

                <div class="essentials__group">
                  <label>Width </label>
                  <a-input type="number" min="1" max="12" v-model="block.size.cols" placeholder="Enter width"
                           size="large" />
                </div>

                <div class="essentials__group">
                  <label>Height </label>
                  <a-input type="number" min="1" max="1000" v-model="block.size.rows"
                           placeholder="Enter height" size="large" />
                </div>
              </div>
            </template>
          </AccordionItem>

          <AccordionItem :config="accordion">
            <template slot="accordion-trigger">
              <p>Component's data</p>
            </template>
            <template #accordion-content>
              <!-- Block's content view -->
              <div class="BlockEditor__editor BlockEditor__editor__block-content">
                <component :is="component" :formData.sync="block.content" :type="block.type" :key="block.id" />
              </div>
            </template>
          </AccordionItem>
        </template>
      </Accordion>
      
    </div>

    <div class="BlockEditor__not-found" v-else>
      select block
    </div>
    </div>
  `
})
export class BlockEditor extends Vue {
  /**
   * Synchronized block.
   */
  @Prop({ type: Object, required: false, default: () => ({}) })
  public block!: IBlock
  /**
   * Registry of the forms
   */
  @Prop({ type: Object, required: false, default: () => containersRegistry })
  private readonly containersRegistry!: Record<PossibleContainer, VueConstructor>
  /**
   * Registry of the forms
   */
  @Prop({ type: Object, required: false, default: () => blocksFormRegistry })
  private readonly formRegistry!: Record<PossibleElements, VueConstructor>

  /**
   * Determines component to be rendered for editing selected `Block`
   */
  public get component (): VueConstructor {
    if (!(this.block.type in this._registry)) {
      console.error(`Could not find view for current Block! Got [${this.block.type}]`)
    }

    return this._registry[(this.block.type) as PossibleContainer]
  }

  /**
   * Determines whether block is selected & has necessary property to be edited.
   */
  public get hasBlock (): boolean {
    return Object.prototype.hasOwnProperty.call(this.block, 'type')
  }

  private get _registry () {
    return merge(this.formRegistry, this.containersRegistry)
  }

  @Watch('block', { deep: true })
  private onBlock (value: any): void {
    console.log(value)
  }
}

export default BlockEditor
