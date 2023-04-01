import Block from '../../utils/Block'
import { Link } from '../Link'
import template from './navigation.pug'
import styles from './index.styl'

const links = [
  {
    label: 'Авторизация',
    href: '/login'
  },
  {
    label: 'Регистрация',
    href: '/register'
  },
  {
    label: 'Чаты',
    href: '/chats'
  },
  {
    label: 'Профиль',
    href: '/profile'
  },
  {
    label: '500',
    href: '/500'
  },
  {
    label: '404',
    href: '/404'
  }
]

export class Navigation extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.links = this.linksList()
  }

  linksList() {
    return links.map((link) => {
      return new Link({
        label: link.label,
        href: link.href,
        style: 'padding: 15px;'
      });
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
