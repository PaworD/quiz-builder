<template>
  <a-form id="auth-form" class="login-form" @submit.prevent="submit">
    <a-form-item>
      <a-input type="email" placeholder="Email" v-model="email">
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input type="password" placeholder="Password" v-model="password">
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox>
        Remember me
      </a-checkbox>
      <a class="login-form-forgot" href="">
        Forgot password
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
      Or
      <a href="">
        register now!
      </a>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { User } from '../models'

import { AuthRepositoryType, IAuthRepository } from '../contracts'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component({ name: 'Auth' })
export class Auth extends Vue {
  @inject(AuthRepositoryType)
  protected readonly authRepository!: IAuthRepository<User>

  public email = ''
  public password = ''

  /**
   * Submits the form.
   */
  public async submit (): Promise<void> {
    try {
      await this.authRepository.login(this.email, this.password)
      this.$store.commit('SET_LOGGED_IN', true)
      this.$router.push({ name: 'dashboard' })
    } catch (e) {
      console.log(e)
    }
  }
}

export default Auth
</script>
