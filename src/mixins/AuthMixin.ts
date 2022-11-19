import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import { User } from 'firebase/auth'

import { AuthRepositoryType, IAuthRepository } from '../contracts'

@Component<AuthMixin>({
  name: 'AuthMixin',
})
export class AuthMixin extends Vue {
  @inject(AuthRepositoryType)
  protected readonly authRepository!: IAuthRepository<User>

  /**
   * Determines whether user is logged in.
   */
  public get isLogged (): boolean {
    return this.$store.getters['isLoggedIn']
  }

  /**
   * Determines whether user is present in context.
   */
  public get user (): User | null {
    return this.authRepository.user
  }

  /**
   * Handles the sign out action.
   */
  public async signOut (): Promise<void> {
    try {
      await this.authRepository.signOut()
    } catch (e) {
      this.$message.error({ content: 'Error occured while signing out.' })
    }
  }
}