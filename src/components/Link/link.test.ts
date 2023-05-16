import { expect } from 'chai'
import Router from '../../utils/Router'
import { BaseLink } from './index'
import sinon from 'sinon'

describe('BaseLink component', () => {
  const callback = sinon.stub()
  const label = 'Login'
  const href = '/login'
  // @ts-ignore
  const router = { go: callback } as typeof Router
  const link = new BaseLink({ href, label, router })

  beforeEach(() => {
    callback.reset()
  })

  it('should render label as it passed', () => {
    expect(link.element?.textContent).to.eq(label)
  })

  it('should call router.go method after click', () => {
    link.element.click()

    expect(callback.calledOnceWith(href)).to.eq(true)
  })

  it('should call router.go once after click', () => {
    link.element.click()

    expect(callback.calledOnce).to.eq(true)
  })
})
