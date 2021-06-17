import { LoginRepository } from './login.repository';

export class SessionService {
  private sessionId: string | undefined;

  constructor(private loginRepository: LoginRepository) {}

  async getSession(): Promise<string | Error> {
    if (this.sessionId) {
      return Promise.resolve(this.sessionId);
    }

    const result: string | Error = await this.loginRepository.getSession();

    if (!(result instanceof Error)) {
      this.setSession(result);
    }

    return result;
  }

  private setSession(session: string): void {
    this.sessionId = session;

    setTimeout(() => {
      this.sessionId = undefined;
    }, 20 * 60 * 1000); // 20 minutes
  }
}
