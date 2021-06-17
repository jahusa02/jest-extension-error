import { createSpyOf, SpyOf } from '../../../test-utils/spy-object';
import { LoginRepository } from './login.repository';
import { SessionService } from './session-service';

describe('SessionService', () => {
  let sessionService: SessionService;
  let loginRepository: SpyOf<LoginRepository>;

  const sessionId = 'SessionId';

  beforeEach(() => {
    loginRepository = createSpyOf(LoginRepository);
    sessionService = new SessionService(loginRepository);
  });

  beforeEach(() => {
    loginRepository.getSession.mockResolvedValue(sessionId);
  });

  it('should be defined', () => {
    expect(sessionService).toBeInstanceOf(SessionService);
  });

  describe('getSession', () => {
    it('should fetch session id from loginRepository on a first call', () => {
      // Arrange

      // Act
      sessionService.getSession().catch(() => {
        // not empty
      });
      // Assert
      expect(loginRepository.getSession).toHaveBeenCalledWith();
    });

    it('should return the sessionId as promise', async () => {
      // Arrange

      // Act
      const result = await sessionService.getSession();
      // Assert
      expect(result).toBe(sessionId);
    });

    it('should only call sessionId once from loginRepository', async () => {
      // Arrange
      await sessionService.getSession();
      // Act
      const result = await sessionService.getSession();
      // Assert
      expect(loginRepository.getSession).toHaveBeenCalledTimes(1);
      expect(result).toBe(sessionId);
    });
  });

  describe('getSession failure', () => {
    it('should return an Error', async () => {
      // Arrange
      const error = new Error();
      loginRepository.getSession.mockResolvedValue(error);
      // Act
      const result = await sessionService.getSession();
      // Assert
      expect(result).toBe(error);
    });
  });

  describe('getSession caching', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should returned session id after calling loginRepository once', async () => {
      // Arrange

      // Act
      const result = await sessionService.getSession();
      // Assert
      expect(loginRepository.getSession).toHaveBeenCalledTimes(1);
      expect(result).toBe(sessionId);
    });

    it('should return session id on further calls within 20 minutes without calling loginRepository', async () => {
      // Arrange
      const maxTime = 1000 * 60 * 20;
      jest.advanceTimersByTime(0);
      await sessionService.getSession();
      jest.advanceTimersByTime(maxTime - 1);

      await sessionService.getSession();
      await sessionService.getSession();
      // Act
      const result = await sessionService.getSession();
      // Assert
      expect(loginRepository.getSession).toHaveBeenCalledTimes(1);
      expect(result).toBe(sessionId);
    });

    it('should renew the session after 20 minutes', async () => {
      // Arrange
      const maxTime = 1000 * 60 * 20;
      jest.advanceTimersByTime(0);
      await sessionService.getSession();
      await sessionService.getSession();
      await sessionService.getSession();
      jest.advanceTimersByTime(maxTime);
      // Act
      const result = await sessionService.getSession();
      // Assert
      expect(loginRepository.getSession).toHaveBeenCalledTimes(2);
      expect(result).toBe(sessionId);
    });
  });
});
