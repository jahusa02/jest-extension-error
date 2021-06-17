import { HttpClientAdapter } from '../../../infrastructure/utils/http-client';
import { LoginCredentials } from './login-params';
import WebServiceConnectionError from '../../../app/shared/errors/webservice-connection-error';

interface WsSessionResult {
  SESSION: string;
}

export class LoginRepository {
  private readonly loginDefaultParameter = {
    FUNCTION: 'LOGIN',
    API: 'JSON',
  };

  constructor(
    private httpClient: HttpClientAdapter,
    private webServiceUrl: string,
    private credentials: LoginCredentials
  ) {}

  getSession(): Promise<string | WebServiceConnectionError> {
    const parameter = {
      ...this.loginDefaultParameter,
      USER: this.credentials.user,
      PASSWORD: this.credentials.password,
    };

    return this.httpClient
      .get<{ body: string }>(this.webServiceUrl, parameter)
      .then((response) => JSON.parse(response.body) as WsSessionResult)
      .then((responseBody: WsSessionResult): string => {
        return responseBody.SESSION;
      })
      .catch(() => {
        return new WebServiceConnectionError();
      });
  }
}
