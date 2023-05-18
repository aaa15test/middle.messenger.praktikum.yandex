import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/index';
import { ProfileEdit } from './pages/profileEdit/profileEdit';
import { UpdatePassword } from './pages/updatePassword/index'
import { Chats } from './pages/chats/index';
import { Page500 } from './pages/500/index';
import { Page404 } from './pages/404/index';
import { store } from './utils/Store'
import AuthController from './controller/AuthController';
import Router from './utils/Router'

enum routes {
  login = '/',
  register = '/sign-up',
  profile = '/settings',
  profileEdit = '/profile-edit',
  updatePassword = '/update-password',
  chats = '/messenger',
  page500 = '/500',
  page404 = '/404',
  addDeleteChatUser = '/add-delete-user'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(routes.login, Login)
    .use(routes.register, Register)
    .use(routes.profile, Profile)
    .use(routes.profileEdit, ProfileEdit)
    .use(routes.updatePassword, UpdatePassword)
    .use(routes.chats, Chats)
    .use(routes.page500, Page500)
    .use(routes.page404, Page404)

  let isProtectedRoute = true;

  const root: HTMLElement = document.getElementById('root');
  const content: HTMLElement = document.createElement('div')
  content.className = 'content'
  root?.append(content)

  switch (window.location.pathname) {
    case routes.login:
    case routes.register:
      isProtectedRoute = false;
      break;
    default:
      isProtectedRoute = true
  }

  try {
    await AuthController.fetchUser()

    console.log(store.getState(), 'store.getState()')
    if (store.getState().user) {
      Router.start()

      if (!isProtectedRoute) {
        Router.go(routes.chats)
      }
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(routes.login);
    }
  }
});
