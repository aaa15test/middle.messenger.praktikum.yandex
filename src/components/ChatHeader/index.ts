import Block from '../../utils/Block'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { withStore, store } from '../../utils/Store'
import template from './chatHeader.pug'
import styles from './index.styl';
import { Chat } from '../../api/ChatAPI';
import chatDefaultAvatar from '../../icons/chatDefaultAvatar.jpg'
import { AddDeleteChatUserModal } from '../AddDeleteChatUserModal'
import ChatController from '../../controller/ChatController'
import { Notification } from '../Notification'

interface ChatHeaderProps {
  userId: string;
  userName: string;
}

export class Header extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({ ...props });
  }

  isAddUserSuccess: boolean

  init() {
    this.children.avatar = new Avatar({
      id: this.props.userId,
      name: 'avatar',
      userName: this.props.userName,
      avatarWidth: '46px',
      src: chatDefaultAvatar,
      events: {
        click: () => console.log('click')
      }
    })
    this.children.button = new Button({
      label: 'Поменять',
      name: 'change',
      type: 'text',
      childrenType: 'bars',
      className: 'withoutBorder',
      style: { width: '30px' },
      events: {
        click: () => this.openPopup()
      },
    });
    this.children.addUser = new Button({
      label: 'Добавить пользователя',
      name: 'change',
      type: 'text',
      className: 'withoutBorder',
      style: { height: '33px' },
      events: {
        click: (e: Event) => this.addUserModalOpen(e)
      },
    });

    this.children.deleteUser = new Button({
      label: 'Удалить пользователя',
      name: 'change',
      type: 'text',
      className: 'withoutBorder',
      style: { height: '33px' },
      events: {
        click: (e: Event) => this.deleteUserModalOpen(e)
      },
    });

    this.children.deleteChat = new Button({
      label: 'Удалить чат',
      name: 'change',
      type: 'text',
      className: 'withoutBorder',
      style: { height: '33px' },
      events: {
        click: (e: Event) => this.deleteChatModalOpen(e)
      },
    });

    this.children.addChatUserModal = new AddDeleteChatUserModal({
      id: 'addUser',
      wrapperId: 'addUserWrapper',
      title: 'Добавить пользователя',
      buttonLabel: 'Добавить',
      isAddUserSuccess: this.isAddUserSuccess
    })

    this.children.deleteChatUserModal = new AddDeleteChatUserModal({
      id: 'deleteUser',
      wrapperId: 'deleteUserWrapper',
      title: 'Удалить пользователя',
      buttonLabel: 'Удалить'
    })

    this.children.deleteChatModal = new AddDeleteChatUserModal({
      id: 'deleteChat',
      wrapperId: 'deleteChatWrapper',
      title: 'Удалить чат',
      buttonLabel: 'Удалить'
    })

    this.children.notification = new Notification(store.getState().notification)
  }

  addUserModalOpen(e: Event) {
    e.preventDefault()
    this.openPopup()
    return (this.children.addChatUserModal as AddDeleteChatUserModal).showModal()
  }

  deleteUserModalOpen(e: Event) {
    this.openPopup()
    return (this.children.deleteChatUserModal as AddDeleteChatUserModal).showModal()
  }

  deleteChatModalOpen(e: Event) {
    this.openPopup()
    return (this.children.deleteChatModal as AddDeleteChatUserModal).showModal()
  }

  openPopup() {
    const popup = document.getElementById('myPopup');
    popup.classList.toggle('show');
  }

  deleteUser(e: Event) {
    e.preventDefault()
    const inputUser = document.getElementById('deleteUser') as HTMLInputElement
    const userLogin = (inputUser as HTMLInputElement).value
    if (userLogin !== '') {
      const searchUser = store.getState().searchUsers.find((user) => user.login === userLogin)
      const inputUserWrapper: any = document.getElementById('deleteUserWrapper')
      if (!searchUser) {
        inputUserWrapper.querySelector('p')?.classList.add('show')
        const errorElement: HTMLParagraphElement = inputUserWrapper.querySelector('p')
        errorElement.textContent = 'Пользователь с таким логином не найден2'
      } else {
        inputUserWrapper.querySelector('p')?.classList.remove('show')
        inputUser.value = ''
        ChatController.deleteUser(searchUser.id, store.getState().activeChatId)
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => {
  const userName = (state.chats.data || []).find((chat: Chat) => {
    return chat.id === state.activeChatId
  })?.title
  return {
    ...state,
    userName
  }
})
export const ChatHeader = withChats(Header as typeof Block);
