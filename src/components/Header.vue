<template>
  <a-layout-header>
    <div v-if="user">
      <a-avatar :size="24" icon="user" />
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator'
import { AuthMixin } from '../mixins/AuthMixin'

@Component({ name: 'Header' })
export class Header extends Mixins<AuthMixin>(AuthMixin) {}
export default Header
</script>
