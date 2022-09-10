<template>
  <div class="ButtonForm">
    <div class="input">
      <label for="label">Label</label>
      <sui-input type="text" name="label" placeholder="Enter button label" v-model="_formData.label"
                 required />
    </div>

    <div class="checkboxes-container">
      <div class="checkbox">
        <label for="disabled">Disabled</label>
        <sui-checkbox name="disabled" v-model="_formData.disabled" required toggle />
      </div>

      <div class="checkbox">
        <label for="loading">Loading</label>
        <sui-checkbox name="loading" v-model="_formData.loading" required toggle />
      </div>
    </div>

    <div class="select">
      <label for="variants">Variants</label>
      <sui-dropdown
        name="variants"
        placeholder="Select button variant"
        selection
        :options="variants"
        v-model="_formData.variant"
      />
    </div>

    <div class="select">
      <label for="themes">Themes</label>
      <sui-dropdown
        name="themes"
        placeholder="Select button theme"
        selection
        :options="themes"
        v-model="_formData.theme"
      />
    </div>

    <div class="select">
      <label for="shapes">Shape</label>
      <sui-dropdown
        name="shapes"
        placeholder="Select button shape"
        selection
        :options="shapes"
        v-model="_formData.shape"
      />
    </div>

    <div class="select">
      <label for="actions">Actions</label>
      <sui-dropdown
        name="actions"
        placeholder="Select button action"
        selection
        :options="actions"
        v-model="_formData.action"
      />
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
  ButtonVariant, SUISelectOptionType
} from './Button.contracts'
import { AnyObject } from '@/builder'

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
@Component<ButtonForm>({
  name: 'ButtonForm'
})
export class ButtonForm extends AbstractBlockForm<ButtonElement> {
  public get actions (): SUISelectOptionType[] {
    return this.mapDataToSUISelectOptions(Object.values(ButtonAction))
  }

  public get shapes (): SUISelectOptionType[] {
    return this.mapDataToSUISelectOptions(Object.values(ButtonShape))
  }

  public get themes (): SUISelectOptionType[] {
    return this.mapDataToSUISelectOptions(Object.values(ButtonTheme))
  }

  public get variants (): SUISelectOptionType[] {
    return this.mapDataToSUISelectOptions(Object.values(ButtonVariant))
  }

  public mapDataToSUISelectOptions = (options: string[]) => {
    return options.map((action) => {
      return {
        text: action,
        value: action
      }
    })
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
