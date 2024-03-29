import Block from '../../utils/Block'
import template from './button.pug'
import styles from './index.styl'

interface ButtonProps {
  id?: number,
  label: string;
  name: string;
  type: string;
  className?: string;
  style?: object;
  labelStyle?: string;
  childrenType?: string,
  events: {
    click?: (e: Event) => void
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
