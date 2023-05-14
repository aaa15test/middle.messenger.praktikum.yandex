import Block from '../../utils/Block'
import { PropsWithRouter, withRouter } from '../../hocs/withRouter'
import template from './link.pug'
import styles from './index.styl';

interface LinkProps extends PropsWithRouter {
  href: string;
  label: string;
  style?: string;
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props)
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(BaseLink)
