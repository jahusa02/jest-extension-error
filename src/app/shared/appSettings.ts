/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default class AppSettings {
  static ServerHost: string;
  static ServerRoot: string;
  static ServerPort: number;
  static Webservice: {
    login: string;
    callservice: string;
  };
  static Login: {
    user: string;
    password: string;
  };

  static init(config: { [key: string]: any }): void {
    this.ServerHost = config.server.Host;
    this.ServerRoot = config.server.Root;
    this.ServerPort = config.server.Port;
    this.Webservice = config.webservice;
    this.Login = config.login;
  }
}
