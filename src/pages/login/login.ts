import Block from '../../utils/Block'
import { Button } from '../../components/Button'
import { InputLabel } from '../../components/InputLabel'
import { Link } from '../../components/Link'
import { validationForm } from '../../utils/validationsForm'
import template from './login.pug';
import styles from './login.styl'

export class Login extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.button = new Button({
      label: 'Войти',
      name: 'login',
      type: 'submit',
      style: { background: '#53aa7e' },
      events: {
        click: (e: Event & { target: HTMLInputElement }) => this.submit(e)
      }
    });

    this.children.email = new InputLabel({
      id: 'email',
      label: 'Email',
      name: 'email',
      type: 'text'
    });

    this.children.password = new InputLabel({
      id: 'password',
      label: 'Пароль',
      name: 'password',
      type: 'password'
    });

    this.children.link = new Link({
      label: 'Регистрация',
      href: '/register'
    });
  }

  getContent() {
    return this.element
  }

  private submit(e: Event & { target: HTMLInputElement }) {
    e.preventDefault()
    validationForm(this.getContent(), e, this.children)
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
