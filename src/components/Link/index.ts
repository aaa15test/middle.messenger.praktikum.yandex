import Block from '../../utils/Block'
import { PropsWithRouter, withRouter } from '../../hocs/withRouter'
import template from './link.pug'
import './index.styl';

interface LinkProps extends PropsWithRouter {
  href: string;
  label: string;
  style?: string;
  events?: {
    click: () => void
  }
}

export class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate()
      }
    })
  }

  navigate() {
    this.props.router.go(this.props.href)
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export const Link = withRouter(BaseLink)
