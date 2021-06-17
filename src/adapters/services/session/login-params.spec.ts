/* eslint-disable  @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */

describe('login-params', () => {
  const originalEnvironment = process.env;

  const user = 'TestUser';
  const password = 'TestPassword';

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnvironment };
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  describe('getLoginCredentials', () => {
    it('should return the defined login credentials', () => {
      // Arrange
      process.env.WS_LOGIN_PASSWORD = user;
      process.env.WS_LOGIN_USER = password;

      const getLoginCredentials = require('./login-params').getLoginCredentials;
      // Act
      const result = getLoginCredentials();
      // Assert
      expect(result).toEqual({
        password: user,
        user: password,
      });
    });
  });
});
