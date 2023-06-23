import Block from '../../utils/Block'
import { Button } from '../../components/Button'
import { ChatHeader } from '../../components/ChatHeader'
import { ChatItem } from '../../components/ChatItem'
import { Notification } from '../../components/Notification'
import { Link } from '../../components/Link'
import { Message } from '../../components/Message'
import { SendMessage } from '../../components/SendMessage'
import { CreateChatModal } from '../../components/CreateChatModal'
import ChatController from '../../controller/ChatController'
import { Chat } from '../../api/ChatAPI'
import template from './chats.pug'
import styles from './chats.styl'
import { store, withStore } from '../../utils/Store'
import MessageController, { MessageData } from '../../controller/MessageController'

interface ChatListProps {
  chats: Chat[],
  isLoading: boolean,
  messages: MessageData[],
  messagesListHeight: number,
  notification: {
    text: string,
    type: string
  }
}

class ChatsPage extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super(props);
  }

  init() {
    ChatController.fetchChats()

    this.children.chatHeader = new ChatHeader({
      userId: store.getState().activeChatId,
      userName: (store.getState().chats.data || []).find((chat) => {
        return chat.id === store.getState().activeChatId
      })?.title
    })

    this.children.myProfileLink = new Link({
      label: 'Мой профиль',
      href: '/settings'
    })

    this.children.messages = this.displayMessages(this.props)

    this.children.sendMessage = new SendMessage()

    this.children.createNewChatButton = new Button({
      label: 'Новый чат',
      name: 'createNewChat',
      type: 'button',
      style: { height: '40px' },
      events: {
        click: () => this.addNewChatModalOpen()
      }
    })

    this.children.createChatModal = new CreateChatModal({})
    this.children.chatsView = this.createChats(this.props)
    this.children.notification = this.showNotification(this.props)
  }

  protected componentDidUpdate(newProps: ChatListProps): boolean {
    this.children.chatsView = this.createChats(newProps)
    this.children.messages = this.displayMessages(newProps)
    this.children.notification = this.showNotification(newProps)
    return true
  }

  private createChats(props: ChatListProps) {
    const chats = props.chats || store.getState().chats.data
    return chats.map((chat) => {
      return new ChatItem({
        ...chat,
        events: {
          click: () => {
            this.selectChat(+chat.id)
          }
        }
      })
    })
  }

  private displayMessages(props: ChatListProps) {
    const messages = props.messages || store.getState().messages
    return messages.map((message: MessageData) => new Message(message))
  }

  async selectChat(chatId: number) {
    ChatController.setActiveChat(chatId)
    const token: any = await ChatController.getToken(chatId)
    if (token) {
      const userId = store.getState().user.id
      MessageController.connect({
        chatId,
        token: token.token,
        userId
      })
      const messagesBlock = document.getElementsByClassName('messages')[0] as HTMLElement
      window.scrollTo(0, messagesBlock.offsetHeight)
    }
  }

  addNewChatModalOpen() {
    return (this.children.createChatModal as unknown as typeof CreateChatModal).showModal()
  }

  showNotification(props: ChatListProps) {
    const notificationsData = props.notification || store.getState().notification
    return new Notification(notificationsData)
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles
    })
  }
}

const withChats = withStore((state) => {
  return {
    chats: [...(state.chats.data || [])],
    messages: [...(state.messages || [])],
    isLoading: state.chats.isLoading,
    activeChatId: state.activeChatId,
    showNotification: state.showNotification
  }
})
export const Chats = withChats(ChatsPage as typeof Block);
