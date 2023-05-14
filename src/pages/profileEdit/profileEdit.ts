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
import { UserUpdateData } from '../../api/UserAPI'
import template from './profileEdit.pug';
import styles from './profileEdit.styl'

interface ProfileEditProps extends User {}

class ProfileEditPage extends Block<ProfileEditProps> {
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

    this.children.email = new InputProfile({
      label: 'Email',
      name: 'email',
      type: 'text',
      value: userData.email
    });

    this.children.login = new InputProfile({
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: userData.login
    });

    this.children.first_name = new InputProfile({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: userData.first_name
    });

    this.children.second_name = new InputProfile({
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      value: userData.second_name
    });

    this.children.display_name = new InputProfile({
      label: 'Имя в чате',
      name: 'display_name',
      type: 'text',
      value: userData.display_name
    });

    this.children.phone = new InputProfile({
      label: 'Телефон',
      name: 'phone',
      type: 'text',
      value: userData.phone
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
      UserController.updateUser(data as UserUpdateData)
    }
  }

  private openUploadAvatarModal(e: Event) {
    e.preventDefault()
    const uploadFileModal = document.getElementById('uploadFileModal')
    uploadFileModal.style.display = 'flex'
  }

  componentDidUpdate(oldProps: ProfileEditProps, newProps: ProfileEditProps): boolean {
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
export const ProfileEdit = withUser(ProfileEditPage as typeof Block);
