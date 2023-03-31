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
        focus: (e: Event & { target: HTMLInputElement }) => this.onValidate(e),
        blur: (e: Event & { target: HTMLInputElement }) => this.onValidate(e)
      }
    })

    this.element?.setAttribute('labelFor', id)
  }

  onValidate(e: Event & { target: HTMLInputElement }) {
    return validation([{ value: e?.target.value || '', regex: regexes[this.props.name].regex }])
      .forEach((item) => {
        if (!item) {
          this.element?.querySelector('p')?.classList.add('show')
          const errorElement: HTMLParagraphElement | null | undefined = this.element?.querySelector('p')
          errorElement.innerHTML = regexes[this.props.name].notice
          this.isValidateValue = false
        } else {
          this.element?.querySelector('p')?.classList.remove('show')
          this.isValidateValue = true
        }
      })
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
