import { Component, Vue } from 'vue-property-decorator'

@Component<MultipleChoiceBlockUi>({
  name: 'MultipleChoiceBlockUi',
  template: `
    <div>
      Ui for Basic Form
    </div>
  `
})
export class MultipleChoiceBlockUi extends Vue {

}
export default MultipleChoiceBlockUi