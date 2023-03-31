import Block from '../../utils/Block'
import { Button } from '../../components/Button'
import { ChatHeader } from '../../components/ChatHeader'
import { ChatItem } from '../../components/ChatItem'
import { Search } from '../../components/Search'
import { Link } from '../../components/Link'
import { Message } from '../../components/Message'
import { SendMessage } from '../../components/SendMessage'
import { chats, messages } from './data.json'
import template from './chats.pug'
import styles from './chats.styl'

export class Chats extends Block {
  constructor() {
    super({});
  }

  activeChatId: string

  init() {
    this.children.search = new Search({
      placeholder: 'Поиск'
    })

    this.children.chatHeader = new ChatHeader({
      userId: chats[0].id,
      userName: chats[0].userName
    })

    this.children.myProfileLink = new Link({
      label: 'Мой профиль',
      href: '/profile'
    })

    this.children.messages = this.displayMessages()

    this.children.sendMessage = new SendMessage()

    this.children.button = new Button({
      label: 'Авторизация',
      name: 'login',
      type: 'submit',
      style: { background: '#53AA7E' },
      events: {
        click: () => console.log('click')
      }
    })

    this.children.chats = this.createChats()
  }

  private createChats() {
    return chats.map((chat: {
      id: string,
      userName: string,
      lastMessage: string,
      messageDate: string,
      unreadMessagesCount?: number
    }) => {
      return new ChatItem({
        ...chat,
        events: {
          click: () => this.setProps({ 'activeChatId': chat.id })
        }
      })
    })
  }

  private displayMessages() {
    return messages.map((message: any) => new Message(message))
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
