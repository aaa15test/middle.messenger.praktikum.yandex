import Block from '../../utils/Block'
import { Avatar } from '../Avatar'
import template from './chatHeader.pug'
import styles from './index.styl';

interface ChatHeaderProps {
  userId: string;
  userName: string;
  events?: {
    click: () => void;
  };
}

export class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({ ...props });
  }

  init() {
    this.children.avatar = new Avatar({
      id: this.props.userId,
      name: 'avatar',
      userName: this.props.userName,
      avatarWidth: '46px',
      events: {
        click: () => console.log('click')
      }
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
