<template>
  <div class="ButtonUi">
    <a-button v-if="this._uiData" type="primary" :class="className" :disabled="disabled"
              :loading="loading">
      {{ text }}
    </a-button>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import { AbstractBlockUi } from '@/builder/_abstract'

import {
  ButtonElement,
  ButtonShapeClassRegistry,
  ButtonThemeClassRegistry,
  ButtonVariantClassRegistry
} from './Button.contracts'

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
@Component<ButtonUi>({
  name: 'MultipleChoiceBlockUi'
})
export class ButtonUi extends AbstractBlockUi<ButtonElement> {
  public get text (): string {
    return this._uiData.label
  }

  public get disabled (): boolean {
    return this._uiData.disabled
  }

  public get loading (): boolean {
    return this._uiData.isLoading
  }

  public get className (): string {
    let classes = ''

    const theme = ButtonThemeClassRegistry[this._uiData.theme]
    if (typeof theme !== 'undefined') {
      classes += theme
    }

    const shape = ButtonShapeClassRegistry[this._uiData.shape]
    if (typeof shape !== 'undefined') {
      classes += shape
    }

    const variant = ButtonVariantClassRegistry[this._uiData.variant]
    if (typeof shape !== 'undefined') {
      classes += variant
    }

    return classes
  }
}
export default ButtonUi
</script>
