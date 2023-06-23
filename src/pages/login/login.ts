import Block from '../../utils/Block'
import { Button } from '../../components/Button'
import { InputLabel } from '../../components/InputLabel'
import { Link } from '../../components/Link'
import { validationForm } from '../../utils/validationsForm'
import AuthController from '../../controller/AuthController'
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
      id: 'login',
      label: 'Логин',
      name: 'login',
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
      href: '/sign-up'
    });
  }

  private submit(e: Event & { target: HTMLInputElement }) {
    e.preventDefault()
    const form: HTMLFormElement = document.querySelector('form')
    const isValid = validationForm(form, this.children).every((item) => item === true)

    if (isValid) {
      const values = Object.values(this.children).filter((child) => child instanceof InputLabel)
        .map((child) => [(child as InputLabel).getName(), (child as InputLabel).getValue()])

      const data = Object.fromEntries(values)
      AuthController.signin(data)
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
