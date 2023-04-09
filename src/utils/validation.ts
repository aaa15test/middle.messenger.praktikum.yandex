export function validation(data: [ { value: string, regex: string | RegExp }]) {
  return data.map(({ value, regex }) => value.match(regex))
}
