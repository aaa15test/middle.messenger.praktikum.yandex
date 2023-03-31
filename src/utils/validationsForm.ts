import { InputLabel } from '../components/InputLabel'

export function validationForm (element: HTMLElement | null, e: Event & { target: HTMLInputElement }, children: {}) {
  const form: any = element?.querySelector('form')
  const formData = new FormData(form)
  console.log(Object.fromEntries(formData.entries()))

  return Object.entries(children).map(([, child]) => {
    if (child instanceof InputLabel) {
      if (!child.isValidateValue) child.onValidate(e)
    }
    return child
  })
}
