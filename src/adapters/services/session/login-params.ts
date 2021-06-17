import config from '../../../infrastructure/config';

export interface LoginCredentials {
  password: string;
  user: string;
}

export function getLoginCredentials(): LoginCredentials {
  return config.login;
}
