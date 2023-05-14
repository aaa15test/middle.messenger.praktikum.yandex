import { InputLabel } from '../components/InputLabel'
import { InputProfile } from '../components/InputProfile'

export function validationForm(
  form: HTMLFormElement,
  e: Event & { target: HTMLInputElement },
  children: {}
) {
  const formData = new FormData(form)
  const formDataObj = Object.fromEntries(formData.entries())
  console.log(Object.fromEntries(formData.entries()))

  const inputs = document.getElementsByClassName('input')
  Array.from(inputs)

  const formElements = Object.entries(children).filter(([, child]) => {
    return child instanceof InputLabel || child instanceof InputProfile
  })

  return formElements.map(([name, child]) => {
    return child.onValidate(formDataObj[name])
  })
}
