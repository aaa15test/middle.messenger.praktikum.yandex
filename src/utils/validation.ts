export function validation(data: [ { value: string, regex: RegExp }]) {
  return data.every(({ value, regex }) => {
    return regex.test(value)
  })
}
