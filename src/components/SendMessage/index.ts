import Block from '../../utils/Block'
import { validation } from '../../utils/validation'
import { regexes } from '../../utils/regexes'
import { Input } from '../Input'
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
  }

  onValidate(e: Event & { target: HTMLInputElement }) {
    const name = 'message'

    validation([{ value: e.target.value, regex: regexes[name].regex }]).forEach((item) => {
      if (!item) {
        this.element?.querySelector('p')?.classList.add('show')
        const errorElement: HTMLParagraphElement = this.element?.querySelector('p')
        errorElement.textContent = regexes[name].notice
      } else {
        this.element?.querySelector('p')?.classList.remove('show')
      }
    })
  }

  render() {
    return this.compile(template, { styles });
  }
}
