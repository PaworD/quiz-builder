import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import { IBlock } from '@/builder'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component<AbstractBlockUi<IBlock>>({
  name: 'AbstractBlockUi'
})
export class AbstractBlockUi<Block extends IBlock> extends Vue {
  @PropSync('data', { type: Object, required: true })
  public _data!: Block['content']

  @Prop({ type: String, required: false })
  public readonly version?: Block['version']
}
export default AbstractBlockUi