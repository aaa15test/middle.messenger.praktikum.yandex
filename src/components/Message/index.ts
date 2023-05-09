import Block from '../../utils/Block'
import { store } from '../../utils/Store'
import template from './message.pug'
import styles from './index.styl'

interface MessageProps {
  id: number,
  chat_id: number,
  user_id: number,
  type: string,
  content: string,
  time: string,
  file: string
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props)
  }

  render() {
    const time = new Date(this.props.time)
    const timeFormated = `${time.getHours()}:${(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}`
    const isMyMessage = this.props.user_id === store.getState().user.id
    return this.compile(template, {
      ...this.props,
      timeFormated,
      isMyMessage,
      styles
    });
  }
}
