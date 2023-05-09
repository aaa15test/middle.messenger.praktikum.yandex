import Block from '../../utils/Block'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { InputProfile } from '../../components/InputProfile'
import { BackButton } from '../../components/BackButton'
import { UploadFileModal } from '../../components/UploadFileModal'
import { validationForm } from '../../utils/validationsForm'
import { withStore } from '../../utils/Store'
import AuthController from '../../controller/AuthController'
import { User } from '../../api/UserAPI'
import router from '../../utils/Router'
import defaultAvatar from '../../icons/defaultAvatar.jpg'
import template from './profile.pug';
import styles from './profile.styl'

interface ProfileProps extends User {}

class ProfilePage extends Block {
  async componentDidMount() {
    await AuthController.fetchUser()
  }

  init() {
    AuthController.fetchUser()

    const userData = this.props

    this.children.changeData = new Button({
      label: 'Изменить данные',
      name: 'change_data',
      type: 'button',
      className: 'outlined green',
      style: { width: '45%' },
      events: {
        click: () => {
          router.go('/profile-edit')
        }
      },
    });

    this.children.changePassword = new Button({
      label: 'Изменить пароль',
      name: 'change_password',
      type: 'button',
      className: 'outlined green',
      style: { width: '45%' },
      events: {
        click: () => {
          router.go('/update-password')
        }
      },
    });

    this.children.logout = new Button({
      label: 'Выйти',
      name: 'logout',
      type: 'button',
      className: 'outlined red',
      style: { width: '45%' },
      events: {
        click: () => AuthController.logout()
      },
    });

    this.children.backButton = new BackButton({
      href: '/messenger',
      events: {
        click: () => console.log('click')
      },
    });

    this.children.avatar = new Avatar({
      id: 'avatar',
      name: 'avatar',
      userName: `${this.props.first_name} ${this.props.second_name}`,
      avatarWidth: '130px',
      src: this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}` : defaultAvatar,
      showUserName: true,
      events: {
        click: (e: Event) => this.openUploadAvatarModal(e)
      },
    });

    this.children.email = new InputProfile({
      label: 'Email',
      name: 'email',
      type: 'text',
      value: this.props.email,
      disabled: true
    });

    this.children.login = new InputProfile({
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: this.props.login,
      disabled: true
    });

    this.children.firstName = new InputProfile({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: this.props.first_name,
      disabled: true
    });

    this.children.lastName = new InputProfile({
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      value: this.props.second_name,
      disabled: true
    });

    this.children.displayName = new InputProfile({
      label: 'Имя в чате',
      name: 'display_name',
      type: 'text',
      value: this.props.display_name,
      disabled: true
    });

    this.children.phone = new InputProfile({
      label: 'Телефон',
      name: 'phone',
      type: 'text',
      value: userData.phone,
      disabled: true
    });

    this.children.uploadFileModal = new UploadFileModal({});
  }

  private submit(e: Event & { target: HTMLInputElement }) {
    e.preventDefault()
    validationForm(this.getContent(), e, this.children)
  }

  private openUploadAvatarModal(e: Event) {
    e.preventDefault()
    const uploadFileModal = document.getElementById('uploadFileModal')
    uploadFileModal.style.display = 'flex'
  }

  protected componentDidUpdate(newProps: ProfileProps): boolean {
    (this.children.avatar as Avatar).setProps({
      src: newProps.avatar ? `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}` : defaultAvatar
    })
    return true
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => {
  return ({ ...state.user })
});
export const Profile = withUser(ProfilePage as typeof Block);
