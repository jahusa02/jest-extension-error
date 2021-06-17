import * as dotenv from 'dotenv';

dotenv.config();

const dev = 'development';

export default {
  Environment: process.env.NODE_ENV || dev,
  server: {
    Root: process.env.SERVER_ROOT || '/fhp',
    Host: process.env.SERVER_HOST || 'localhost',
    Port: process.env.SERVER_PORT || 5000,
    Origins: process.env.ORIGINS || 'http://localhost:3000,http://localhost:3001,http://localhost:3002',
  },
  webservice: {
    login: process.env.WS_LOGIN_URL,
    callservice: process.env.WS_CALLSERVICE_URL,
  },
  login: {
    user: process.env.WS_LOGIN_USER || '',
    password: process.env.WS_LOGIN_PASSWORD || '',
  },
  params: {
    envs: {
      Dev: dev,
      Stage: 'stage',
      Production: 'production',
    },
  },
};
