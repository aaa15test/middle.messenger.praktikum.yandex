import Block from '../../utils/Block'
import { Button } from '../Button'
import UserController from '../../controller/UserController'
import { withStore } from '../../utils/Store'
import template from './uploadFileModal.pug'
import styles from './index.styl';

interface UploadFileModalProps {
  href?: string;
  label?: string;
}

class UploadFile extends Block<UploadFileModalProps> {
  constructor(props: UploadFileModalProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      label: 'Поменять',
      name: 'change',
      type: 'text',
      events: {
        click: (e: Event) => this.submit(e)
      },
    });

    this.children.close = new Button({
      label: 'X',
      name: 'close',
      type: 'text',
      className: 'outlined green',
      style: { width: '30px', height: '29px' },
      events: {
        click: () => this.hideModal()
      },
    });
  }

  private submit(e: Event) {
    e.preventDefault()
    const avatar = document.getElementById('avatarUpload') as HTMLInputElement
    const formData = new FormData()
    formData.append('avatar', avatar.files[0])
    UserController.updateUserAvatar(formData)

    const uploadFileModal = document.getElementById('uploadFileModal')
    uploadFileModal.style.display = 'none'
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => {
  return (state.user)
});
export const UploadFileModal = withUser(UploadFile as typeof Block);
