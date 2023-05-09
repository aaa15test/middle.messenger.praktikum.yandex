import { EventBus } from '../utils/EventBus'
import { store } from '../utils/Store'

export interface MessageData {
  'id': number,
  'chat_id': number,
  'user_id': number,
  'type': string,
  'content': string,
  'time': string,
  'file': string
}

export interface MessageOffset {
  'offset': number
}

const socketUrl = 'wss://ya-praktikum.tech/ws/chats/'
enum WebSocketMethods {
  Open = 'open',
  Close = 'close',
  Ping = 'ping',
  Message = 'message',
  Error = 'error',
  GetOld = 'get old'
}

export interface WebSocketData {
  chatId: number,
  userId: number,
  token: string
}

class MessageController extends EventBus {
  private webSocket: WebSocket
  private pingDuration: any

  async connect(data: WebSocketData) {
    this.webSocket = new WebSocket(`${socketUrl}${data.userId}/${data.chatId}/${data.token}`)
    this.subscribe(this.webSocket)
    this.triggerPing()
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.triggerPing()
      this.getMessages({ offset: 0 });
    })

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (message) => {
      const newMessage = JSON.parse(message.data)
      if (Array.isArray(newMessage)) {
        if (newMessage.length) {
          if (newMessage[0].id === 0) {
            store.set('messages', newMessage)
          } else {
            store.set('messages', [...newMessage].reverse())
          }
        } else {
          store.set('messages', [])
        }
      } else if (typeof newMessage === 'object' && newMessage.type === 'message') {
        store.set('messages', [newMessage, ...store.getState().messages.reverse()].reverse())
      }
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });
  }

  public getMessages(options: MessageOffset) {
    this.webSocket.send(
      JSON.stringify({
        content: options.offset.toString(),
        type: WebSocketMethods.GetOld,
      })
    );
  }

  public sendMessage(message: string) {
    this.webSocket.send(JSON.stringify({
      content: message,
      type: WebSocketMethods.Message
    }))
  }

  private triggerPing() {
    this.pingDuration = setInterval(() => {
      this.webSocket.send(JSON.stringify({ type: WebSocketMethods.Ping }))
    }, 10000)

    clearInterval(this.pingDuration)
    this.on(WebSocketMethods.Close, () => {
      clearInterval(this.pingDuration)
      this.pingDuration = 0
    })
  }

  addEventListener() {
    this.webSocket.addEventListener(WebSocketMethods.Open, this.openWebSocket)
  }

  openWebSocket() {

  }
}

export default new MessageController();
