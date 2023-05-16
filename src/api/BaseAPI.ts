import HTTPTransport from '../utils/HTTPTransport';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  create(data: unknown) { throw new Error(`${data} not implemented yet`) }

  read() { throw new Error() }

  update() { throw new Error() }

  delete() { throw new Error() }
}
