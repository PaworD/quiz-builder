<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :span="6">
        <a-form layout="vertical" @submit.prevent="submit">
          <a-form-item>
            <a-input placeholder="Username">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input type="password" placeholder="Password">
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="secondary" html-type="submit">
              Log in
            </a-button>
          </a-form-item>
        </a-form>
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
@Component({ name: 'Auth' })
export class Auth extends Vue {
  @inject(AuthRepositoryType)
  protected readonly authRepository!: IAuthRepository<User>

  /**
   * Submits the form.
   */
  public async submit (): Promise<void> {
    const user = await this.authRepository.getUser()

    this.$store.commit('setUser', user)
  }
}

export default Auth
</script>
