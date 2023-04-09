import Block from '../../utils/Block'
import template from './avatar.pug'
import styles from './index.styl'

interface AvatarProps {
  id: string;
  name: string;
  userName: string;
  avatarWidth: string;
  showUserName?: boolean;
  events: {
    click: () => void;
  };
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
