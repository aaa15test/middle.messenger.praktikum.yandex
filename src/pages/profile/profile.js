import profile from 'bundle-text:./profile.pug'

export function Profile (params) {
  document.body.innerHTML = profile

  const uploadFileModal = document.getElementById('uploadFileModal')
  const avatarBtn = document.getElementById('avatar')
  const body = document.body

  avatarBtn.onclick = function() {
    uploadFileModal.style.display = 'flex'
    body.style['overflow-y'] = 'hidden'
  }

  window.onclick = function(event) {
    if (event.target === uploadFileModal) {
      uploadFileModal.style.display = 'none'
      body.style['overflow-y'] = 'scroll'
    }
  }

}
