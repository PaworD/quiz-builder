<template>
  <div>
    <form @submit.prevent="submit">
      <div>
        <h3>Quiz Builder</h3>
      </div>

      <div>
        <input type="text" placeholder="Login">
        <input type="text" placeholder="Password">
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import { User } from '../models'

import { AuthRepositoryType, IAuthRepository } from '../repositories'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
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
    console.log(user)
  }
}
export default Auth
</script>
