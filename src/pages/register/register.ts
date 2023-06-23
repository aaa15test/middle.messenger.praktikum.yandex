import Block from '../../utils/Block'
import { Button } from '../../components/Button'
import { InputLabel } from '../../components/InputLabel'
import { Link } from '../../components/Link'
import { validationForm } from '../../utils/validationsForm'
import AuthController from '../../controller/AuthController'
import { SignupData } from '../../api/AuthAPI'
import template from './register.pug';
import styles from './register.styl'

export class Register extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.email = new InputLabel({
      id: 'email',
      label: 'Email',
      name: 'email',
      type: 'text'
    });

    this.children.login = new InputLabel({
      id: 'login',
      label: 'Логин',
      name: 'login',
      type: 'text'
    });

    this.children.first_name = new InputLabel({
      id: 'first_name',
      label: 'Имя',
      name: 'first_name',
      type: 'text'
    });

    this.children.second_name = new InputLabel({
      id: 'second_name',
      label: 'Фамилия',
      name: 'second_name',
      type: 'text'
    });

    this.children.phone = new InputLabel({
      id: 'phone',
      label: 'Телефон',
      name: 'phone',
      type: 'text'
    });

    this.children.password = new InputLabel({
      id: 'password',
      label: 'Пароль',
      name: 'password',
      type: 'password'
    });

    this.children.passwordAgain = new InputLabel({
      id: 'passwordAgain',
      label: 'Пароль (еще раз)',
      name: 'passwordAgain',
      type: 'password'
    });

    this.children.register = new Button({
      label: 'Регистрация',
      name: 'register',
      type: 'submit',
      style: { background: '#53aa7e' },
      events: {
        click: (e: Event & { target: HTMLInputElement }) => this.submit(e)
      },
    });

    this.children.loginLink = new Link({
      label: 'Авторизация',
      href: '/login'
    });
  }

  private submit(e: Event & { target: HTMLInputElement }) {
    e.preventDefault()
    const form: HTMLFormElement = document.querySelector('form')
    const isValid = validationForm(form, this.children)

    if (isValid) {
      const values = Object.values(this.children).filter((child) => child instanceof InputLabel)
        .map((child) => [(child as InputLabel).getName(), (child as InputLabel).getValue()])

      const data = Object.fromEntries(values)
      AuthController.signup(data as SignupData)
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles })
  }
}
