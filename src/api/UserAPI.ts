import BaseAPI from './BaseAPI'

export interface UserUpdateData {
  'first_name': string,
  'second_name': string,
  'login': string,
  'email': string,
  'phone': string,
  'display_name': string,
  'avatar': string
}

export interface User {
  'id': number,
  'first_name': string
  'second_name': string
  'display_name': string
  'login': string
  'email': string
  'phone': string
  'avatar': string,
  'password': string
}

export interface UserUpdatePassword {
  'oldPassword': string,
  'newPassword': string
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data)
  }

  updateUser(data: UserUpdateData) {
    return this.http.put('/profile', data)
  }

  updatePassword(data: UserUpdatePassword) {
    return this.http.put('/password', data)
  }

  getUser() {
    return this.http.get<User>('/user');
  }

  searchUser(login: string) {
    return this.http.post('/search', { login })
  }
}
