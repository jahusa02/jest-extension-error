import { NextFunction, Request, Response } from 'express';

export const accessControl =
  () =>
  (
    _request: Request, // _ because of not used value
    response: Response,
    next: NextFunction
  ): void => {
    response.append('Access-Control-Allow-Origin', ['*']);
    response.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
  };
