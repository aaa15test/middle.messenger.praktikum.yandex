import { expect } from 'chai'
import HTTPTransport, { Method } from './HTTPTransport'
import sinon from 'sinon'

describe('HTTPTransport class', () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = []

  const XHR = sinon.useFakeXMLHttpRequest()

  // @ts-ignore
  global.XMLHttpRequest = XHR

  XHR.onCreate = function (xhr) {
    requests.push(xhr)
  }

  afterEach(() => {
    requests.length = 0
  })

  it('should call xhr with GET method if get called', () => {
    const transport = new HTTPTransport('/auth')
    transport.get()

    expect(requests[0].method).to.eq(Method.Get)
  })

  it('should call xhr with POST method if get called', () => {
    const transport = new HTTPTransport('/auth')
    transport.post('/login', { a: 'a' })

    expect(requests[0].method).to.eq(Method.Post)
  })
})
