import Block from '../../utils/Block'
import template from './backButton.pug'
import styles from './index.styl'

interface BackButtonProps {
  href: string;
  events: {
    click: () => void
  };
}

export class BackButton extends Block<BackButtonProps> {
  constructor(props: BackButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
