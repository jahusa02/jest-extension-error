/* eslint-disable @typescript-eslint/no-unsafe-return */
import { SessionService } from '../../adapters/services/session/session-service';
import { HttpClient } from './http-client';
import WebServiceConnectionError from '../../app/shared/errors/webservice-connection-error';

interface WebServiceResult<T> {
  RESULT: T;
  REQUEST_ID: string;
  STATUS: string;
  STATUSCODE: string;
}

export class WgWebServiceAdapter {
  constructor(private sessionService: SessionService, private httpClient: HttpClient, private webServiceUrl: string) {}

  async call<T>(parameter = {}): Promise<T> {
    const result: string | Error = await this.sessionService.getSession();

    return new Promise((resolve, reject) => {
      if (result instanceof Error) {
        reject(result);
      }

      const callArgs = {
        ...parameter,
        SESSION: result as string,
      };

      this.httpClient
        .get<{ body: string }>(this.webServiceUrl, callArgs)
        .then((response) => JSON.parse(response.body))
        .then((responseBody: WebServiceResult<T>) => {
          if (responseBody.STATUSCODE === '0') {
            resolve(responseBody.RESULT);
          } else {
            reject();
          }
        })
        .catch(() => {
          reject(new WebServiceConnectionError());
        });
    });
  }
}
