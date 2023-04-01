import Block from '../../utils/Block'
import { regexes } from '../../utils/regexes'
import { validation } from '../../utils/validation'
import { Input } from '../Input'
import template from './inputProfile.pug'
import styles from './index.styl'

interface InputProfileProps {
  label: string,
  name: string,
  type: string,
  value: string,
  events?: {
    focus?: (e: Event) => void,
    blur?: (e: Event) => void
  }
}

export class InputProfile extends Block<InputProfileProps> {
  constructor(props: InputProfileProps) {
    super(props)
  }

  init() {
    const { name, type, value } = this.props
    const style = {
      border: 0,
      height: '20px',
      width: '100%',
      'margin-top': 0,
      color: '#333',
      padding: '4px 12px'
    }

    this.children.input = new Input({
      id: name,
      name,
      type,
      value,
      style,
      events: {
        focus: (e: Event & { target: HTMLInputElement }) => this.onValidate(e),
        blur: (e: Event & { target: HTMLInputElement }) => this.onValidate(e)
      }
    });
  }

  onValidate(e: Event & { target: HTMLInputElement }) {
    validation([{ value: e ? e.target.value : '', regex: regexes[this.props.name].regex }])
      .forEach((item) => {
        if (!item) {
          this.element?.querySelector('p')?.classList.add('show')
          const errorElement: HTMLParagraphElement = this.element?.querySelector('p')
          errorElement.innerHTML = regexes[this.props.name].notice
        } else {
          this.element?.querySelector('p')?.classList.remove('show')
        }
      })
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
