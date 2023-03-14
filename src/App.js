import { Login } from './pages/login/index'
import { Register } from './pages/register/index'
import { Profile } from './pages/profile/index'
import { Chats } from './pages/chats/index'
import { Page500 } from './pages/500/index'
import { Page404 } from './pages/404/index'

export const App = () => {
  switch (window.location.pathname) {
    case '/login':
      return Login()
    case '/register':
      return Register()
    case '/profile':
      return Profile()
    case '/chats':
      return Chats()
    case '/500':
      return Page500()
    case '/404':
      return Page404()
    default:
      return Login()
  }
}
