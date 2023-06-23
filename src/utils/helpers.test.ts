import { expect } from 'chai'
import { set } from './helpers'

describe('util set', () => {
  it('should return first if it is non-object', () => {
    const result = set(null, '', '123')

    expect(result).to.eq(null)
  })

  it('should return the same object as it passed', () => {
    const obj = { a: 1, b: 2 }
    const path = 'a'
    const value = 3

    const result = set(obj, path, value)
    expect(result).to.eq(obj)
  })
})
