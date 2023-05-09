import { ChatAPI } from '../api/ChatAPI'
import { store } from '../utils/Store'

export class ChatController {
  private api: ChatAPI

  constructor() {
    this.api = new ChatAPI();
  }

  async getChats() {
    store.set('chats.isLoading', true)
    const chats = await this.api.read()
    store.set('chats.data', chats)
  }

  async createNewChat(title: string) {
    try {
      store.set('chats.isLoading', true);
      await this.api.create(title)
      const chats = await this.api.read();

      store.set('chats.data', chats)
      store.set('chats.isLoading', false);
    } catch (err) {
      console.log(err)
    }
  }

  async fetchChats() {
    store.set('chats.isLoading', true);
    await this.api.read()
      .then((chats) => {
        store.set('chats.data', chats);
      })
      .finally(() => {
        setTimeout(() => store.set('chats.isLoading', false), 1000);
      });
  }

  setActiveChat(id: number) {
    store.set('activeChatId', id)
  }

  async addUser(userId: number, chatId: string) {
    try {
      await this.api.addUser(userId, chatId)
    } catch (err) {
      store.set('showNotification', true)
    }
  }

  async deleteUser(userId: number, chatId: string) {
    try {
      await this.api.deleteUser(userId, chatId)
    } catch (err) {
      console.log(err)
    }
  }

  async getUsers(chatId: string) {
    const chatUser = await this.api.getUsers(chatId)
    store.set('chatUsers', chatUser)
  }

  async getToken(chatId: number) {
    let token
    try {
      token = await this.api.getToken(chatId)
    } catch (err) {
      console.log(err)
    }
    return token
  }

  async deleteChat(chatId: number) {
    try {
      await this.api.deleteChat(chatId)
      await this.fetchChats()
      store.set('activeChatId', null)
    } catch (err) {
      console.log(err)
    }
  }
}

export default new ChatController();
