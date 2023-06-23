import { EventBus } from './EventBus'
import { set } from './helpers'
import Block from './Block'
import { User } from '../api/UserAPI'
import { Chat } from '../api/ChatAPI'
import { MessageData } from '../controller/MessageController'
import { isEqual } from './isEqual'

export enum StoreEvents {
  Updated = 'updated',
}

type State = {
  user: null | User,
  isLoading: boolean,
  hasError: boolean,
  chats: {
    data: Chat[],
    isLoading: boolean;
  },
  activeChatId?: string,
  searchUsers: User[],
  chatUser: User[],
  messages: MessageData[],
  showNotification: boolean,
  notification: {
    text: string,
    type: string
  }
}

const initialState: State = {
  user: null,
  isLoading: true,
  hasError: false,
  chats: {
    data: [],
    isLoading: true
  },
  activeChatId: null,
  searchUsers: [],
  chatUser: [],
  messages: [],
  showNotification: false,
  notification: {
    text: '',
    type: ''
  }
};

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state = initialState

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}
const store = new Store()

export function withStore(mapStateToProps: (state: State) => any) {
  return (Component: typeof Block) => {
    return class extends Component {
      static showModal() {
        throw new Error('Method not implemented.')
      }
      constructor(props: any) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            state = newState;
            this.setProps({ ...newState });
          }
        });
      }
    }
  }
}

export { store }
