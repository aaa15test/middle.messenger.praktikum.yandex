import Block from '../../utils/Block'
import template from './input.pug'
import styles from './index.styl';

interface InputProps {
  id: string,
  label?: string,
  name: string;
  type: string;
  placeholder?: string;
  value?: string,
  style?: {},
  events?: {
    click?: (e: Event) => unknown,
    focus?: (e: Event) => void,
    blur?: (e: Event) => void,
    input?: (e: Event) => unknown
  }
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props)
  }

  init() {
    this.element?.setAttribute('id', this.props.id)
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
