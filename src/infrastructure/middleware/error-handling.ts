import { NextFunction, Request, Response } from 'express';
import WebServiceConnectionError from '../../app/shared/errors/webservice-connection-error';
import RouteNotImplementedError from '../../app/shared/errors/route-not-implemented-error';

export const errorHandling =
  () =>
  (error: Error, _request: Request, response: Response, next: NextFunction): void => {
    let status: number;

    switch (true) {
      case error instanceof RouteNotImplementedError:
        status = 400;
        break;

      case error instanceof WebServiceConnectionError:
        status = 504;
        break;

      default:
        status = 500;
        break;
    }

    response.status(status).json({
      message: error.message,
      timeStamp: Date.now(),
    });

    next();
  };
