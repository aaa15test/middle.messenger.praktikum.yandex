import Block from '../../utils/Block'
import { regexes } from '../../utils/regexes'
import { validation } from '../../utils/validation'
import { Input } from '../Input'
import template from './inputLabel.pug'
import styles from './index.styl';

interface InputLabelProps {
  id: string,
  label?: string,
  name: string;
  type: string;
  placeholder?: string;
  value?: string,
  wrapperId?: string,
  notShowValidateMessage?: boolean,
  events?: {
    focus?: (e: Event) => void,
    blur?: (e: Event) => void
  }
}

export class InputLabel extends Block<InputLabelProps> {
  constructor(props: InputLabelProps) {
    super(props)
  }

  isValidateValue = false

  init() {
    const {
      id, type, name, placeholder, value
    } = this.props
    this.children.input = new Input({
      id,
      type,
      name,
      placeholder,
      value,
      events: {
        focus: (e: Event & { target: HTMLInputElement }) => {
          this.onValidate(e?.target.value || this.props.value)
        },
        blur: (e: Event & { target: HTMLInputElement }) => {
          this.onValidate(e?.target.value || this.props.value)
        }
      }
    })

    this.element?.setAttribute('labelFor', id)
  }

  onValidate(value: string) {
    if (this.props.notShowValidateMessage) return true
    const isValid = validation([{
      value,
      regex: regexes[this.props.name].regex
    }])
    if (!isValid) {
      this.element?.querySelector('p')?.classList.add('show')
      const errorElement: HTMLParagraphElement = this.element?.querySelector('p')
      errorElement.textContent = regexes[this.props.name].notice
      this.isValidateValue = false
    } else {
      this.element?.querySelector('p')?.classList.remove('show')
      this.isValidateValue = true
    }
    return this.isValidateValue
  }

  getName() {
    return (this.children.input as Input).getName()
  }

  getValue() {
    return (this.children.input as Input).getValue()
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
