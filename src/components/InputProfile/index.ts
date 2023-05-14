import Block from '../../utils/Block'
import { regexes } from '../../utils/regexes'
import { validation } from '../../utils/validation'
import { Input } from '../Input'
import { store } from '../../utils/Store'
import template from './inputProfile.pug'
import styles from './index.styl'

interface InputProfileProps {
  label: string,
  name: string,
  type: string,
  value?: string,
  disabled?: boolean,
  key?: string,
  options?: [],
  readonly?: boolean,
  events?: {
    focus?: (e: Event) => void,
    blur?: (e: Event) => void
  }
}

export class InputProfile extends Block<InputProfileProps> {
  constructor(props: InputProfileProps) {
    super(props)
  }

  isValidateValue = false

  init() {
    const {
      name,
      type,
      value,
      disabled,
      options
    } = this.props

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
      disabled,
      options,
      events: {
        focus: (e: Event & { target: HTMLInputElement }) => {
          this.onValidate(e?.target.value || this.props.value)
        },
        blur: (e: Event & { target: HTMLInputElement }) => {
          this.onValidate(e?.target.value || this.props.value)
        }
      }
    });
  }

  onValidate(value: string) {
    const isValid = validation([{
      value,
      regex: regexes[this.props.key || this.props.name].regex
    }])
    if (!isValid) {
      this.element?.querySelector('p')?.classList.add('show')
      const errorElement: HTMLParagraphElement = this.element?.querySelector('p')
      errorElement.textContent = regexes[this.props.key || this.props.name].notice
      this.isValidateValue = false
    } else {
      this.element?.querySelector('p')?.classList.remove('show')
      this.isValidateValue = true
    }
    return this.isValidateValue
  }

  getValue() {
    return (this.children.input as Input).getValue()
  }

  getName() {
    return (this.children.input as Input).getName()
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
