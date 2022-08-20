import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import { IBlock } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<AbstractBlockForm<IBlock>>({
  name: 'AbstractBlockForm',
  mounted (): void {
    this.boot()
  }
})
export class AbstractBlockForm<Block extends IBlock> extends Vue {
  @PropSync('data', { type: Object, required: true })
  public _data!: Block['content']

  @Prop({ type: String, required: false })
  public readonly version?: Block['version']

  protected boot (): void {
    this._data = { ...this.createInitialContent(), ...this._data }
  }

  protected createInitialContent (): Block['content'] {
    // Override
    throw new Error('Method must be overridden!')
  }
}