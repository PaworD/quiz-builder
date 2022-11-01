import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import { IBlock } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<AbstractBlockUi<IBlock>>({
  name: 'AbstractBlockUi'
})
export class AbstractBlockUi<Block extends IBlock> extends Vue {
  @PropSync('content', { type: Object, required: true })
  public _content!: Block['content']

  @Prop({ type: String, required: true })
  public readonly identifier!: Block['id']

  @Prop({ type: String, required: false })
  public readonly type?: Block['type']

  /**
   * **HAS TO** be overridden in subclass.
   */
  protected reply: any = null

  /**
   * Handles accepting reply and adding passing extra necessary info.
   */
  protected acceptReply (reply: any) {
    this.$emit('reply', {
      qId: this.identifier,
      type: this.type,
      reply
    })
  }
}
export default AbstractBlockUi