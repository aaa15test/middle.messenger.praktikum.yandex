import Block from '../../utils/Block'
import { Button } from '../Button'
import { Input } from '../Input'
import ChatController from '../../controller/ChatController'
import { withStore } from '../../utils/Store'
import template from './createChatModal.pug'
import styles from './index.styl'

class CreateChat extends Block {
  init() {
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

    this.children.button = new Button({
      label: 'Создать',
      name: 'change',
      type: 'text',
      events: {
        click: (e: any) => {
          this.createNewChat(e)
        }
      },
    });

    this.children.nameInput = new Input({
      id: 'createChat',
      name: 'chatName',
      type: 'text'
    })
  }

  createNewChat(e: any) {
    e.preventDefault()
    const chatInput = (document.getElementById('createChat') as HTMLInputElement)
    ChatController.createNewChat(chatInput.value)
    chatInput.value = ''
    this.hideModal()
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => {
  return { ...state }
});
export const CreateChatModal = withUser(CreateChat as typeof Block);
