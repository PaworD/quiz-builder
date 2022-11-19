import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import { IBlock } from '@/builder'

/**
 * Abstract block form that every `.form` component **HAS TO** extend.
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
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
  public readonly type?: Block['type']

  /**
   *
   * @protected
   */
  protected boot (): void {
    this._data = { ...this.createInitialContent(), ...this._data }
  }

  /**
   * Creates the initial content for quiz, so it can boot up with predefined data.
   */
  protected createInitialContent (): Block['content'] {
    // Override
    throw new Error('Method must be overridden!')
  }
}
export default AbstractBlockForm