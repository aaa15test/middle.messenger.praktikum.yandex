import BaseAPI from './BaseAPI';

export interface CreateNewChat {
  'title': string
}

export interface Chat {
  'id': string,
  'title': string,
  'avatar': string,
  'unread_count': number,
  'last_message': {
    'user': {
      'first_name': string,
      'second_name': string,
      'avatar': string,
      'email': string,
      'login': string,
      'phone': string
    },
    'time': string,
    'content': string
  }
}

export interface ChatUser {
  'offset': number,
  'limit': number,
  'name': string,
  'emeil': string
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  read(): Promise<Chat[]> {
    return this.http.get('')
  }

  create(title: string) {
    return this.http.post('/', { title })
  }

  addUser(userId: number, chatId: string) {
    return this.http.put('/users', { users: [userId], chatId })
  }

  deleteUser(userId: number, chatId: string) {
    return this.http.delete('/users', { users: [userId], chatId })
  }

  getUsers(chatId: string) {
    return this.http.get(`/${chatId}/users`)
  }

  getToken(chatId: number) {
    return this.http.post(`/token/${chatId}`)
  }

  deleteChat(chatId: number) {
    return this.http.delete('', { chatId })
  }

  delete = undefined
  update = undefined
}
