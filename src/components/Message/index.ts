import Block from '../../utils/Block'
import template from './message.pug'
import styles from './index.styl';

interface MessageProps {
  text: string,
  date: string,
  isMyMessage?: boolean
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props)
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
