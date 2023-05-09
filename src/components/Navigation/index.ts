import Block from '../../utils/Block'
import { Link } from '../Link'
import template from './navigation.pug'
import styles from './index.styl'

const links = [
  {
    label: 'Авторизация',
    href: '/'
  },
  {
    label: 'Регистрация',
    href: '/sign-up'
  },
  {
    label: 'Чаты',
    href: '/messenger'
  },
  {
    label: 'Профиль',
    href: '/settings'
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
