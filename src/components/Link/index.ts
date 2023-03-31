import Block from '../../utils/Block'
import template from './link.pug'
import styles from './index.styl';

interface LinkProps {
  href: string;
  label: string;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props)
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
