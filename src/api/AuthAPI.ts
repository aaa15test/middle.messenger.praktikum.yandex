import BaseAPI from './BaseAPI'

export interface SignupData {
  'first_name': string,
  'second_name': string,
  'login': string,
  'email': string,
  'phone': string,
  'password': string
}

export interface SigninData {
  'login': string,
  'password': string
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

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data)
  }

  signup(data: SignupData) {
    return this.http.post('/signup', data)
  }

  logout() {
    return this.http.post('/logout')
  }

  getUser(): Promise<User> {
    return this.http.get('/user');
  }

  create = undefined
  delete = undefined
  read = undefined
  update = undefined
}
