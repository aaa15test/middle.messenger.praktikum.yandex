export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: METHODS;
  data?: any;
};

function queryStringify(data: Record<string, unknown>) {
  let arr: string[] = []
  for (let key in data) {
    const tmp = data[key]
    arr.push(`${key}=${tmp}`)
  }
  const str = arr.join('&')
  return '?' + str
}

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get = (
    url: string,
    options: {
      method: string,
      data: Record<string, unknown>,
      timeout: number
    }
  ) => { 
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  }

  post = (
    url: string,
    options: {
      method: string,
      data: Record<string, unknown>,
      timeout: number
    }
  ) => { 
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  }

  put = (
    url: string,
    options: {
      method: string,
      data: Record<string, unknown>,
      timeout: number
    }
  ) => { 
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  }

  delete = (
    url: string,
    options: {
      method: string,
      data: Record<string, unknown>,
      timeout: number
    }
  ) => { 
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  }

  request = (
    url: string,
    options: {
      method: string,
      data: Record<string, unknown> 
    },
    timeout: number = 5000
  ) => {
    const { method, data } = options;
    
    if (method === METHODS.GET && data) {
      url += queryStringify(data)
    } 

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout
      
      xhr.onload = function() {
        resolve(xhr);
      };
  
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(url);
      }
    });
  };
}
