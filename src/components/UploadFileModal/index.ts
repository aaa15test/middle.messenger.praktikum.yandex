import Block from '../../utils/Block'
import { Button } from '../Button'
import { Link } from '../Link'
import template from './uploadFileModal.pug'
import styles from './index.styl';

interface UploadFileModalProps {
  href?: string;
  label?: string;
}

export class UploadFileModal extends Block<UploadFileModalProps> {
  constructor(props: UploadFileModalProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      label: 'Change',
      name: 'change',
      type: 'text',
      events: {
        click: () => console.log('click')
      },
    });

    this.children.link = new Link({
      label: 'Select file on compute',
      href: '/'
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
