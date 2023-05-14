import Block from '../../utils/Block'
import template from './notification.pug'
import styles from './index.styl';

interface NotificationProps {
  text: string,
  type: string
}

export class Notification extends Block<NotificationProps> {
  constructor(props: NotificationProps) {
    super(props)
  }

  render() {
    return this.compile(template, {
      ...this.props,
      className: this.props.type === 'success' ? 'successNotification' : 'errorNotification',
      styles
    });
  }
}
