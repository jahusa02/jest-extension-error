import express, { Application, Router } from 'express';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { accessControl } from '../middleware/access-control';

import { CommonRoutesConfig } from '../../adapters/controllers/base/common/common-routes-config';
import controller from '../../adapters/controllers';
import config from '../../infrastructure/config';
import AppSettings from '../../app/shared/appSettings';
import { errorHandling } from '../middleware/error-handling';

export default class App {
  private app: Application = express();

  constructor() {
    this.setup();
    this.initApplication();
    this.initRoutes();
    this.initErrorHandling();
  }

  start(): void {
    this.listen();
  }

  private setup(): void {
    AppSettings.init(config);
  }

  private initApplication(): void {
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(
      morgan('Method: :method | Path: :url | Status: :status | Size: :res[content-length] | Time: :response-time ms')
    );
    this.app.use(accessControl());
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  private initRoutes(): void {
    const controllerList: Array<CommonRoutesConfig> = Object.values(controller);
    controllerList.forEach((currentController: CommonRoutesConfig): void => {
      console.log(`⚡️[server]: Router added routes for ${currentController.getName()}`);

      const router: Router = Router();
      this.app.use(config.server.Root, currentController.configureRoutes(router));
    });
  }

  private initErrorHandling(): void {
    this.app.use(errorHandling());
  }

  private listen(): void {
    this.app.listen(AppSettings.ServerPort, (): void => {
      console.log(`⚡️[server]: Server is running at http://${AppSettings.ServerHost}:${AppSettings.ServerPort}`);
    });
  }
}
