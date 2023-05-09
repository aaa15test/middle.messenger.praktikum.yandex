import Block from '../../utils/Block'
import { Button } from '../Button'
import { InputLabel } from '../InputLabel'
import { Avatar } from '../Avatar'
import UserController from '../../controller/UserController'
import AuthController from '../../controller/AuthController'
import { User } from '../../api/UserAPI'
import { withStore, store } from '../../utils/Store'
import template from './addDeleteChatUserModal.pug'
import styles from './index.styl';
import ChatController from '../../controller/ChatController'

interface AddDeleteChatUserModalProps {
  id: string,
  wrapperId: string,
  title: string,
  buttonLabel?: string,
  isAddUserSuccess: boolean,
  events?: {
    click: (e: Event) => void
  };
}

interface UserProps {
  searchUsers: User[]
}

class AddDeleteChatUser extends Block<AddDeleteChatUserModalProps> {
  constructor(props: AddDeleteChatUserModalProps) {
    super(props);
  }

  searchUserData: User[]

  init() {
    AuthController.fetchUser()

    this.children.close = new Button({
      label: 'X',
      name: 'close',
      type: 'text',
      className: 'outlined green',
      style: { width: '30px', height: '29px' },
      events: {
        click: () => this.hideModal()
      },
    });

    this.children.addDeleteButton = new Button({
      label: this.props.buttonLabel,
      name: 'change',
      type: 'text',
      events: {
        click: (e: Event) => {
          if (this.props.wrapperId !== 'deleteChatWrapper') {
            this.onSearchUser(e)
          } else {
            this.deleteChat()
          }
        }
      },
    });

    this.children.enterLogin = new InputLabel({
      id: this.props.id,
      wrapperId: this.props.wrapperId,
      label: 'Логин',
      name: 'login',
      type: 'text',
      notShowValidateMessage: true
    })
  }

  async onSearchUser(e: Event) {
    e.preventDefault()
    const input = (this.children.enterLogin as InputLabel).getValue()
    if (input) await UserController.searchUser(input)
    this.showModal()
    this.addDeleteUser(e)
  }

  addDeleteUser(e: Event) {
    e.preventDefault()
    const inputUser: any = document.getElementById(this.props.id)
    const userLogin = inputUser.value

    if (userLogin !== '') {
      const searchUser = store.getState().searchUsers.find((user) => user.login === userLogin)
      if (!searchUser) {
        store.set('notification', {
          text: 'Пользователь с таким логином не найден',
          type: 'error'
        })
      } else if (this.props.wrapperId === 'addUserWrapper') {
        ChatController.addUser(searchUser.id, store.getState().activeChatId)
        store.set('notification', {
          text: 'Пользователь успешно добавлен в чат',
          type: 'success'
        })
      } else {
        ChatController.deleteUser(searchUser.id, store.getState().activeChatId)
        store.set('notification', {
          text: 'Пользователь успешно удален из чата',
          type: 'success'
        })
      }
      store.set('showNotification', true)
      inputUser.value = ''
      setTimeout(() => {
        store.set('showNotification', false)
      }, 2000)
    }
  }

  deleteChat() {
    ChatController.deleteChat(+store.getState().activeChatId)
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => {
  return { ...state }
});
export const AddDeleteChatUserModal = withUser(AddDeleteChatUser as typeof Block);
