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

  public get isLogged (): boolean {
    return this.$store.getters['isLoggedIn']
  }

  public get user (): User | null {
    return this.authRepository.user
  }
}