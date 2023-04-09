import Block from '../../utils/Block'
import template from './search.pug'
import styles from './index.styl';

interface SearchProps {
  name?: string;
  placeholder: string;
}

export class Search extends Block<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
