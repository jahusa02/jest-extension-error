import got from 'got';
import querystring, { ParsedUrlQueryInput } from 'querystring';

export interface HttpClient {
  get<T>(url: string, parameter?: ParsedUrlQueryInput): Promise<T>;
}

export class HttpClientAdapter implements HttpClient {
  async get<T>(url: string, parameter?: ParsedUrlQueryInput): Promise<T> {
    if (parameter) {
      const params: string = querystring.encode(parameter);
      url += '?' + querystring.unescape(params);
    }

    const data = await got(url);
    // TODO: Den Shizzle mit GotPromise angucken
    return await (data as unknown as Promise<T>);
  }
}
