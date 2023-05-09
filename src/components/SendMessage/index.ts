import Block from '../../utils/Block'
import { validation } from '../../utils/validation'
import { regexes } from '../../utils/regexes'
import { Input } from '../Input'
import { Button } from '../Button'
import MessageController from '../../controller/MessageController'
import template from './sendMessage.pug'
import styles from './index.styl'

export class SendMessage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.input = new Input({
      id: 'message',
      name: 'message',
      type: 'text',
      placeholder: 'Введите ваше сообщение',
      events: {
        focus: (e: Event & { target: HTMLInputElement }) => this.onValidate(e),
        blur: (e: Event & { target: HTMLInputElement }) => this.onValidate(e)
      }
    })

    this.children.sendButton = new Button({
      label: '',
      name: 'close',
      type: 'text',
      childrenType: 'send',
      className: 'withoutBorder',
      style: { width: '30px', height: '29px' },
      events: {
        click: (e: Event) => this.sendMessage(e)
      },
    });
  }

  onValidate(e: Event & { target: HTMLInputElement }) {
    const name = 'message'

    const isValid = validation([{ value: e.target.value, regex: regexes[name].regex }])
    if (!isValid) {
      this.element?.querySelector('p')?.classList.add('show')
      const errorElement: HTMLParagraphElement = this.element?.querySelector('p')
      errorElement.textContent = regexes[name].notice
    } else {
      this.element?.querySelector('p')?.classList.remove('show')
    }
  }

  sendMessage(e: Event) {
    e.preventDefault()
    const messageInput = document.getElementById('message') as HTMLInputElement

    if (messageInput) {
      const { value } = messageInput
      if (value !== '') {
        MessageController.sendMessage(value)
        messageInput.value = ''
      }
    }

    const messagesBlock = document.getElementsByClassName('messages')[0] as HTMLElement
    messagesBlock.scrollTop = messagesBlock.offsetHeight
  }

  render() {
    return this.compile(template, { styles });
  }
}
