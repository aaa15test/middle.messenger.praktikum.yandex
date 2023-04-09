import { InputLabel } from '../components/InputLabel'

export function validationForm(
  element: HTMLElement,
  e: Event & { target: HTMLInputElement },
  children: {}
) {
  const form: HTMLFormElement = element?.querySelector('form')
  const formData = new FormData(form)
  console.log(Object.fromEntries(formData.entries()))

  return Object.entries(children).map(([, child]) => {
    if (child instanceof InputLabel) {
      if (!child.isValidateValue) child.onValidate(e)
    }
    return child
  })
}
