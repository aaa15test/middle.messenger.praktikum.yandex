import Block from '../../utils/Block'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { InputProfile } from '../../components/InputProfile'
import { BackButton } from '../../components/BackButton'
import { UploadFileModal } from '../../components/UploadFileModal'
import { validationForm } from '../../utils/validationsForm'
import { store, withStore } from '../../utils/Store'
import UserController from '../../controller/UserController'
import { User } from '../../api/UserAPI'
import { UserUpdatePassword } from '../../api/UserAPI'
import template from './updatePassword.pug';
import styles from './updatePassword.styl'

interface UpdatePasswordProps extends User {}

class UpdatePasswordPage extends Block<UpdatePasswordProps> {
  init() {
    const userData = store.getState().user
    if (!userData) return

    this.children.save = new Button({
      label: 'Сохранить',
      name: 'save',
      type: 'button',
      events: {
        click: (e: Event & { target: HTMLInputElement }) => this.submit(e)
      },
    });

    this.children.backButton = new BackButton({
      href: '/settings',
      events: {
        click: () => console.log('click')
      },
    });

    this.children.avatar = new Avatar({
      id: 'avatar',
      name: 'avatar',
      userName: `${userData.first_name} ${userData.second_name}`,
      avatarWidth: '130px',
      src: `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`,
      showUserName: true,
      events: {
        click: (e: Event) => this.openUploadAvatarModal(e)
      },
    });

    this.children.oldPassword = new InputProfile({
      label: 'Старый пароль',
      name: 'oldPassword',
      key: 'password',
      type: 'password'
    });

    this.children.newPassword = new InputProfile({
      label: 'Новый пароль',
      name: 'newPassword',
      key: 'password',
      type: 'password'
    });

    this.children.repeatNewPassword = new InputProfile({
      label: 'Повторите новый пароль',
      name: 'repeatNewPassword',
      key: 'password',
      type: 'password'
    });

    this.children.uploadFileModal = new UploadFileModal({});
  }

  private async submit(e: Event & { target: HTMLInputElement }) {
    e.preventDefault()
    const form: HTMLFormElement = document.querySelector('form')
    const isValid = validationForm(form, e, this.children).every((item) => item === true)

    if (isValid) {
      const values = Object.values(this.children).filter((child) => child instanceof InputProfile)
        .map((child) => [(child as InputProfile).getName(), (child as InputProfile).getValue()])

      const data = Object.fromEntries(values)
      await UserController.updatePassword(data as UserUpdatePassword)
    }
  }

  private openUploadAvatarModal(e: Event) {
    e.preventDefault()
    const uploadFileModal = document.getElementById('uploadFileModal')
    uploadFileModal.style.display = 'flex'
  }

  componentDidUpdate(oldProps: UpdatePasswordProps, newProps: UpdatePasswordProps): boolean {
    (this.children.avatar as Avatar).setProps({
      src: store.getState().user.avatar ? `https://ya-praktikum.tech/api/v2/resources${store.getState().user.avatar}` : ''
    })

    return true
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));
export const UpdatePassword = withUser(UpdatePasswordPage as typeof Block);
