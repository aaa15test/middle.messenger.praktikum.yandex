import { expect } from 'chai'
import Router from './Router'

describe('Router', () => {
  it('go back', () => {
    Router.back()
    expect(window.history.length).to.eq(1)
  })

  it('go forward', () => {
    Router.forward()
    expect(window.history.length).to.eq(1)
  })
})
