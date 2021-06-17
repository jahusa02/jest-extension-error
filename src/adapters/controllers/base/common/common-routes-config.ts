import { Router } from 'express';

export abstract class CommonRoutesConfig {
  protected abstract name: string;

  abstract configureRoutes(router: Router): Router;

  getName(): string {
    return this.name;
  }
}
