<template>
  <a-modal
    title="Please enter password"
    :visible="_visible" centered okText="Save" width="50%"
    :closable="false" :maskClosable="false" @ok="handleOk" @cancel="handleCancel">
    <template slot="footer">
      <a-button key="submit" type="primary" @click="handleOk">
        Submit
      </a-button>
    </template>

    <a-row>
      <a-col>
        <a-input v-model="password" type="password" placeholder="Password" />
        <a-alert v-if="error" type="error" :message="error" show-icon style="margin-top: 1rem" />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

@Component({ name: 'ViewerPasswordModal' })
export class ViewerPasswordModal extends Vue {
  @PropSync('visible', { type: Boolean, required: true })
  public _visible!: boolean

  @Prop({ type: String, required: true })
  public passKey!: string

  public password = ''
  public error = ''

  protected checkIfCorrect (): boolean {
    return this.password === this.passKey;
  }

  public handleOk (): void {
    this.error = ''

    if (this.checkIfCorrect()) {
      this._visible = false
    } else {
      this.error = 'Given password is not correct'
    }
  }

  public handleCancel (): void {
    this._visible = false
  }
}
export default ViewerPasswordModal
</script>
