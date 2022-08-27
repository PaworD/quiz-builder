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

  @Prop({ type: String, required: false })
  public readonly type?: Block['type']
}
export default AbstractBlockUi