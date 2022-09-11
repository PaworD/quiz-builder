<template>
  <div class="ButtonForm">
    <div class="input">
      <label for="label">Label</label>
      <a-input type="text" name="label" placeholder="Enter button label" size="large"
               v-model="_formData.label" required allow-clear />
    </div>

    <div class="select">
      <label for="variants">Variants</label>
      <a-select
        name="variants"
        placeholder="Select button variant"
        show-search
        size="large"
        v-model="_formData.variant"
      >
        <a-select-option v-for="(variant, index) in variants" :value="variant"
                         :key="`buttonVariant-${index}`">
          {{ variant }}
        </a-select-option>
      </a-select>
    </div>

    <div class="select">
      <label for="themes">Themes</label>
      <a-select
        name="themes"
        placeholder="Select button theme"
        show-search
        size="large"
        v-model="_formData.theme"
      >
        <a-select-option v-for="(theme, index) in themes" :value="theme"
                         :key="`buttonTheme-${index}`">
          {{ theme }}
        </a-select-option>
      </a-select>
    </div>

    <div class="select">
      <label for="shapes">Shape</label>
      <a-select
        name="shapes"
        placeholder="Select button shape"
        show-search
        size="large"
        v-model="_formData.shape"
      >
        <a-select-option v-for="(shape, index) in shapes" :value="shape"
                         :key="`buttonShape-${index}`">
          {{ shape }}
        </a-select-option>
      </a-select>
    </div>

    <div class="select">
      <label for="actions">Actions</label>
      <a-select
        name="actions"
        placeholder="Select button action"
        show-search
        size="large"
        v-model="_formData.action"
      >
        <a-select-option v-for="(action, index) in actions" :value="action"
                         :key="`buttonAction-${index}`">
          {{ action }}
        </a-select-option>
      </a-select>
    </div>

    <div v-if="_formData.action === 'link'">
      link
    </div>
    <div v-else>click</div>

    <div class="checkboxes-container">
      <div class="checkbox">
        <label for="disabled">Disabled</label>
        <a-switch name="disabled" v-model="_formData.disabled" size="large" required/>
      </div>

      <div class="checkbox">
        <label for="loading">Loading</label>
        <a-switch name="loading" v-model="_formData.loading" size="large" required />
      </div>
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
  public get actions (): string[] {
    return Object.values(ButtonAction)
  }

  public get shapes (): string[] {
    return Object.values(ButtonShape)
  }

  public get themes (): string[] {
    return Object.values(ButtonTheme)
  }

  public get variants (): string[] {
    return Object.values(ButtonVariant)
  }


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
  }
}

export default ButtonForm
</script>
