<template>
  <div class="VariantBox">
    <span :for="index">{{ index + 1 }}</span>
    <slot />

    <div class="d-flex justify-content-between mt-2">
      <div>
        <label :for="`answer-${index}`">
          <input type="checkbox" :name="`answer-${index}`" :id="`answer-${index}`"
                 :value="index" v-model="_model">
          Mark as answer
        </label>
      </div>
      <div v-if="!isAnswer">
        <button class="VariantBox__remove" @click="onRemove">Remove</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

@Component({ name: 'VariantBox' })
export class VariantBox extends Vue {
  @Prop({ type: [Number, String], required: true })
  public readonly index!: number | string

  @PropSync('model', { type: [Number, String], required: true })
  public _model!: string | number

  public onRemove (): void {
    this.$emit('remove', this.index)
  }

  public get isAnswer (): boolean {
    return this.index === this._model
  }
}
export default VariantBox
</script>
