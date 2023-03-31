export function validation(data: [ { value: string, regex: any }]) {
  return data.map(({ value, regex }) =>  value.match(regex))
}
