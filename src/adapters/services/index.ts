import { HttpClientAdapter } from '../../infrastructure/utils/http-client';

import { SessionService } from './session/session-service';
import { getLoginCredentials } from './session/login-params';
import { LoginRepository } from './session/login.repository';

const httpClientAdapter = makeHttpClientAdapter();
const loginService = makeLoginWs();
const sessionService = makeSessionService();

function makeLoginWs() {
  return new LoginRepository(httpClientAdapter, '', getLoginCredentials());
}

function makeSessionService() {
  return new SessionService(loginService);
}

function makeHttpClientAdapter() {
  return new HttpClientAdapter();
}

const shared = { httpClientAdapter, sessionService };

export default shared;
