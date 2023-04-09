import { Navigation } from './components/Navigation';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/index';
import { Chats } from './pages/chats/index';
import { Page500 } from './pages/500/index';
import { Page404 } from './pages/404/index';

export const App = () => {
  const root: HTMLElement = document.getElementById('root');
  const content: HTMLElement = document.createElement('div')
  content.className = 'content'
  let page

  switch (window.location.pathname) {
    case '/login':
      page = new Login()
      break
    case '/register':
      page = new Register()
      break
    case '/profile':
      page = new Profile()
      break
    case '/chats':
      page = new Chats()
      break
    case '/500':
      page = new Page500()
      break
    case '/404':
      page = new Page404()
      break
    default:
      page = new Login()
      break
  }

  const navigation = new Navigation()
  root?.appendChild(navigation.element)
  content.appendChild(page.getContent())

  root?.append(content)
}
