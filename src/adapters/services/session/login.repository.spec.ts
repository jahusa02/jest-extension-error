import { LoginRepository } from './login.repository';
import { HttpClientAdapter } from '../../../infrastructure/utils/http-client';
import { LoginCredentials } from './login-params';
import { createSpyOf, SpyOf } from '../../../test-utils/spy-object';
import WebServiceConnectionError from '../../../app/shared/errors/webservice-connection-error';

describe('login repository', () => {
  let repository: LoginRepository;

  let httpClient: SpyOf<HttpClientAdapter>;

  const credentials: LoginCredentials = { user: 'FakeUser', password: 'FakePassword' };
  const webServiceUrl = 'http://my-webservice-url.fake';

  const sessionResultSuccess = {
    SESSION: 'SessionId',
  };

  beforeEach(() => {
    httpClient = createSpyOf(HttpClientAdapter);
  });

  beforeEach(() => {
    repository = new LoginRepository(httpClient, webServiceUrl, credentials);
  });

  it('should be defined', () => {
    expect(repository).toBeInstanceOf(LoginRepository);
  });

  describe('getSession', () => {
    it('should get session from httpClient with correct parameters', () => {
      // Arrange
      httpClient.get.mockResolvedValue(JSON.stringify(sessionResultSuccess));
      // Act
      repository.getSession().catch(() => {
        // not empty
      });
      // Assert
    });
  });

  describe('getSession - success', () => {
    it('should return the session id', async () => {
      // Arrange
      const clientResult = { body: JSON.stringify(sessionResultSuccess) };
      httpClient.get.mockResolvedValue(clientResult);
      // Act
      const result = await repository.getSession();
      // Assert
      expect(result).toBe(sessionResultSuccess.SESSION);
    });
  });

  describe('getSession - fail', () => {
    it('should return WebServiceConnectionError', async () => {
      // Arrange
      httpClient.get.mockRejectedValue({});
      // Act
      const result = await repository.getSession();
      // Assert
      expect(result).toBeInstanceOf(WebServiceConnectionError);
    });
  });
});
