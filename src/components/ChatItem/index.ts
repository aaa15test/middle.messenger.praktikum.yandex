import Block from '../../utils/Block'
import { Avatar } from '../Avatar'
import template from './chatItem.pug'
import styles from './index.styl'

interface ChatItemProps {
  id: string,
  userName: string,
  lastMessage: string,
  messageDate: string,
  unreadMessagesCount?: number,
  isActive?: boolean,
  events: {
    click: (e: Event) => void
  }
}

export class ChatItem extends Block<ChatItemProps> {
  constructor(props) {
    super(props);
  }

  isActive: boolean

  init() {
    this.children.avatar = new Avatar({
      id: 'avatar',
      name: 'avatar',
      userName: this.props.userName,
      avatarWidth: '47px',
      events: {
        click: () => console.log('click')
      }
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
