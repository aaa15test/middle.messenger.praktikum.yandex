import Block from '../../utils/Block'
import { Link } from '../../components/Link'
import template from './500.pug';
import styles from './500.styl'

export class Page500 extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.link = new Link({
      label: 'Назад к чатам',
      href: '/chats'
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
