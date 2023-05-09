import { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'
import { store } from '../utils/Store'
import router from '../utils/Router'

class AuthController {
  private api: AuthAPI

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data)
      await this.fetchUser();
      router.go('/messenger')
    } catch (err) {
      store.set('user.hasError', true);
    }
  }

  signup(data: SignupData) {
    this.api.signup(data)
      .then(() => router.go('/messenger'))
      .catch(console.log)
  }

  async logout() {
    try {
      await this.api.logout()
      router.go('/')
    } catch (e) {
      console.log(e)
    }
  }

  async fetchUser() {
    store.set('isLoading', true);
    store.set('editData', false);
    const user = await this.api.getUser()
    store.set('user', user)
    return user
  }
}

export default new AuthController();
