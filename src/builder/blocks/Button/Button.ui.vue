<template>
  <button>tutaj będzie button</button>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import { AbstractBlockUi } from '@/builder/_abstract'

import { ButtonElement } from './Button.contracts'

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
@Component<ButtonUi>({
  name: 'MultipleChoiceBlockUi'
})
export class ButtonUi extends AbstractBlockUi<ButtonElement> {}
export default ButtonUi
</script>
