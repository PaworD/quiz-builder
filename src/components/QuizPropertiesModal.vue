
<template>
  <a-modal
    title="Quiz Properties"
    :visible="_visible"
    centered
    okText="Save"
    width="50%"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-row type="flex" justify="center">
      <a-col :span="12">
        <span>Assign title: </span>
        <a-input placeholder="Duration" v-model="properties.title" />
      </a-col>

      <a-col :span="12">
        <span>Assign duration: </span>
        <a-input placeholder="Duration" v-model="properties.duration" />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component({ name: 'QuizPropertiesModal' })
export class QuizPropertiesModal extends Vue {
  @PropSync('visible', { type: Boolean, required: true })
  public _visible!: boolean

  public properties = {
    title: '',
    duration: 60
  }

  public handleOk (): void {
    this.$emit('onApply', )
    this._visible = false
  }

  public handleCancel (): void {
    this._visible = false
  }
}
export default QuizPropertiesModal
</script>
