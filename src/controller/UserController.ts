import { UserAPI, UserUpdateData, UserUpdatePassword } from '../api/UserAPI'
import { store } from '../utils/Store'
import router from '../utils/Router'
import AuthController from './AuthController'

class UserController {
  private api: UserAPI

  constructor() {
    this.api = new UserAPI();
  }

  async updateUserAvatar(data: FormData) {
    try {
      await this.api.updateAvatar(data)
      await AuthController.fetchUser()
    } catch (err) {
      console.log(err)
    }
  }

  async updateUser(data: UserUpdateData) {
    try {
      await this.api.updateUser(data)
      await AuthController.fetchUser()
      router.go('/settings')
    } catch (err) {
      console.log(err)
    }
  }

  async updatePassword(data: UserUpdatePassword) {
    try {
      await this.api.updatePassword(data)
      await AuthController.fetchUser()
      router.go('/messenger')
    } catch (err) {
      console.log(err)
    }
  }

  async fetchUser() {
    store.set('isLoading', true);
    store.set('editData', false);
    await this.api.getUser()
      .then((user) => {
        store.set('user', user);
      })
      .finally(() => {
        setTimeout(() => store.set('isLoading', false), 1000);
      });
  }

  async searchUser(login: string) {
    try {
      const users = await this.api.searchUser(login)
      store.set('searchUsers', users)
    } catch (err) {
      console.log(err)
    }
  }
}

export default new UserController();
