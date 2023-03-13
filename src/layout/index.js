import html from 'bundle-text:./main.pug'

export function renderLayout (params) {
  document.body.innerHTML = html
}
