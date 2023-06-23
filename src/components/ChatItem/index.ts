import Block from '../../utils/Block'
import { Avatar } from '../Avatar'
import { withStore } from '../../utils/Store'
import template from './chatItem.pug'
import styles from './index.styl'

const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

interface ChatItemProps {
  id: string,
  title: string,
  avatar?: string,
  unread_count: number,
  last_message?: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      email: string,
      login: string,
      phone: string
    },
    time?: string,
    content?: string,
  }
  isActive?: boolean,
  events: {
    click: (e: Event) => void
  }
}

class Chat extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props);
  }

  isActive: boolean

  init() {
    this.children.avatar = new Avatar({
      id: 'avatar',
      name: 'avatar',
      userName: '111',
      avatarWidth: '47px',
      events: {
        click: () => console.log('click')
      }
    })
  }

  render() {
    let timeFormated = ''
    if (this.props.last_message?.time) {
      const today = new Date()
      const time = new Date(this.props.last_message?.time)
      const isToday = time.toDateString() === today.toDateString()
      timeFormated = isToday
        ? `${time.getHours()}:${(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}`
        : `${time.getDate()} ${monthNames[time.getMonth()]} ${time.getFullYear()}`
    }
    return this.compile(template, { ...this.props, timeFormated, styles });
  }
}

const withChats = withStore((state) => {
  return { ...state.chats, activeChatId: state.activeChatId }
})
export const ChatItem = withChats(Chat as typeof Block);
