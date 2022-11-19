<template>
  <div class="Auth-wrapper">
    <a-row v-if="error">
      <a-col :xl="24">
        <a-alert
          message="Something went wrong!"
          :description="error"
          type="error"
          closable
        />
      </a-col>
    </a-row>

    <a-row>
      <a-col>
        <h2 class="Auth__lead" >Quiz Builder 1.0v </h2>
      </a-col>
    </a-row>

    <a-row>
      <a-col :xl="24">
        <div class="Auth__login">
          <form @submit.prevent="submit">
            <a-input type="email" placeholder="Email" v-model="email" required>
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
            <a-input type="password" placeholder="Password" v-model="password" required>
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>

            <a-input v-if="isRegistering" type="password" placeholder="Password"
                     v-model="repeatPassword" required>
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
            <a-button type="primary" html-type="submit" class="login-form-button">
              {{ isRegistering ? 'Sign up' : 'Log In' }}
            </a-button>

            <a-button type="secondary" html-type="button" class="login-form-button" @click="toggleMode">
              {{ isRegistering ? 'Have an account?' : 'Create an Account' }}
            </a-button>
          </form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { User } from '../models'

import { AuthRepositoryType, IAuthRepository } from '../contracts'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<Auth>({ name: 'Auth' })
export class Auth extends Vue {
  @inject(AuthRepositoryType)
  protected readonly authRepository!: IAuthRepository<User>

  public email = ''
  public password = ''
  public repeatPassword = ''
  public error = ''
  public isRegistering = false

  /**
   * Submits the form.
   */
  public async submit (): Promise<void> {
    this.error = ''
    try {

      if (this.isRegistering) {
        if (this.password !== this.repeatPassword) {
          this.error = 'Passwords should be identical'
          return
        }

        await this.authRepository.signup(this.email, this.password)
      } else {
        await this.authRepository.login(this.email, this.password)
      }

      this.$store.commit('SET_LOGGED_IN', true)
      this.$router.push({ name: 'dashboard' })
    } catch (e) {
      const error = (e as Error).message

      this.error = error

      if (error.includes('auth/wrong-password')) this.error = 'This is email is already in use'
      if (error.includes('auth/user-not-found')) this.error = 'No user found with the given credentials'
      if (error.includes('auth/wrong-password')) this.error = 'Wrong password is provided'
      if (error.includes('auth/too-many-requests')) this.error = 'Account temporarily disabled due to severarl unsuccessful logins. Please try again later'
    }
  }

  public toggleMode (): void {
    this.isRegistering = !this.isRegistering
  }
}

export default Auth
</script>
