<template>
  <div class="ButtonForm">
    <div class="input">
      <label for="label">Label</label>
      <input type="text" name="label" placeholder="Enter button label" v-model="_formData.label" required>
    </div>

    <div class="checkbox">
      <label for="disabled">Disabled</label>
      <input type="checkbox" name="disabled" v-model="_formData.disabled" required>
    </div>

    <div class="checkbox">
      <label for="loading">Loading</label>
      <input type="checkbox" name="loading" v-model="_formData.loading" required>
    </div>

    <div class="select">
      <label for="variants">Variants</label>
      <select name="variants" v-model="_formData.variant" required>
        <option
          v-for="(variant, index) in variants"
          :value="variant"
          :key="`buttonVariant-${index}`"
        >
          {{ variant }}
        </option>
      </select>
    </div>

    <div class="select">
      <label for="themes">Themes</label>
      <select name="themes" v-model="_formData.theme" required>
        <option
          v-for="(theme, index) in themes"
          :value="theme"
          :key="`buttonTheme-${index}`"
        >
          {{ theme }}
        </option>
      </select>
    </div>

    <div class="select">
      <label for="shapes">Shape</label>
      <select name="shapes" v-model="_formData.shape" required>
        <option
          v-for="(shape, index) in shapes"
          :value="shape"
          :key="`buttonShape-${index}`"
        >
          {{ shape }}
        </option>
      </select>
    </div>

    <div class="select">
      <label for="actions">Actions</label>
      <select name="actions" v-model="_formData.action" required>
        <option
          v-for="(action, index) in actions"
          :value="action"
          :key="`buttonAction-${index}`"
        >
          {{ action }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'

import { AbstractBlockForm } from '../../_abstract/AbstractBlockForm'

import {
  ButtonAction,
  ButtonElement,
  ButtonShape,
  ButtonTheme,
  ButtonVariant
} from './Button.contracts'
import { AnyObject } from '@/builder'

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
@Component<ButtonForm>({
  name: 'ButtonForm'
})
export class ButtonForm extends AbstractBlockForm<ButtonElement> {
  public readonly actions: string[] = Object.values(ButtonAction)
  public readonly shapes: string[] = Object.values(ButtonShape)
  public readonly themes: string[] = Object.values(ButtonTheme)
  public readonly variants: string[] = Object.values(ButtonVariant)

  /**
   * @override
   */
  protected createInitialContent (): ButtonElement['content'] {
    return {
      action: 'link',
      disabled: false,
      isLoading: false,
      label: 'Click me',
      shape: ButtonShape.Rectangle,
      theme: ButtonTheme.Primary,
      variant: ButtonVariant.Full
    }
  }


  @Watch('_formData', { deep: true })
  public onButtonFormDataChange (oldValue: AnyObject, newValue: AnyObject): void {
    console.log(this._formData)
    console.log(oldValue, newValue)
  }
}

export default ButtonForm
</script>
