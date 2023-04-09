import Block from '../../utils/Block'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { InputProfile } from '../../components/InputProfile'
import { BackButton } from '../../components/BackButton'
import { UploadFileModal } from '../../components/UploadFileModal'
import { validationForm } from '../../utils/validationsForm'
import template from './profile.pug';
import styles from './profile.styl'

export class Profile extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.changeData = new Button({
      label: 'Изменить данные',
      name: 'change_data',
      type: 'button',
      className: 'outlined green',
      style: { width: '45%' },
      events: {
        click: () => console.log('click')
      },
    });

    this.children.changePassword = new Button({
      label: 'Изменить пароль',
      name: 'change_password',
      type: 'button',
      className: 'outlined green',
      style: { width: '45%' },
      events: {
        click: () => console.log('click')
      },
    });

    this.children.logout = new Button({
      label: 'Выйти',
      name: 'logout',
      type: 'button',
      className: 'outlined red',
      style: { width: '45%' },
      events: {
        click: () => console.log('click')
      },
    });

    this.children.save = new Button({
      label: 'Сохранить',
      name: 'save',
      type: 'button',
      style: { width: '45%' },
      events: {
        click: (e: Event & { target: HTMLInputElement }) => this.submit(e)
      },
    });

    this.children.backButton = new BackButton({
      href: '/chats',
      events: {
        click: () => console.log('click')
      },
    });

    this.children.avatar = new Avatar({
      id: 'avatar',
      name: 'avatar',
      userName: 'Имя пользователя',
      avatarWidth: '130px',
      showUserName: true,
      events: {
        click: () => console.log('click')
      },
    });

    this.children.email = new InputProfile({
      label: 'Email',
      name: 'email',
      type: 'text',
      value: 'pochta@yandex.ru'
    });

    this.children.login = new InputProfile({
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: 'ivanovivan'
    });

    this.children.firstName = new InputProfile({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: 'Ivan'
    });

    this.children.lastName = new InputProfile({
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      value: 'Ivanov'
    });

    this.children.displayName = new InputProfile({
      label: 'Имя в чате',
      name: 'display_name',
      type: 'text',
      value: 'Ivanov'
    });

    this.children.phone = new InputProfile({
      label: 'Телефон',
      name: 'phone',
      type: 'text',
      value: '79999999999'
    });

    this.children.uploadFileModal = new UploadFileModal({});
  }

  private submit(e: Event & { target: HTMLInputElement }) {
    e.preventDefault()
    validationForm(this.getContent(), e, this.children)
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
