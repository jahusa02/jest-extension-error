/* eslint-disable @typescript-eslint/await-thenable */

import { AgentController } from './agent.controller';
import { GetAgentUseCase } from '../../../app/modules/agent/use-cases/get-agent/get-agent';
import { createSpyOf, SpyOf } from '../../../test-utils/spy-object';
import { NextFunction, Request, Response, Router } from 'express';
import RouteNotImplementedError from '../../../app/shared/errors/route-not-implemented-error';
import { ResponseModel } from '../../../app/modules/agent/use-cases/get-agent/get-agent.models';

describe('controller agent', () => {
  let controller: AgentController;
  let useCase: SpyOf<GetAgentUseCase>;
  let router: Router;

  let request: Request;
  let response: Response;
  let next: NextFunction;

  let routeHandler: (request: Request, response: Response, next: NextFunction) => void;

  const responseModel: ResponseModel = {
    agent: {
      id: '007',
      firstName: 'James',
      lastName: 'Bond',
      locale: 'en',
    },
  };

  beforeEach(() => {
    useCase = createSpyOf(GetAgentUseCase);
    controller = new AgentController(useCase);
    router = Router();

    request = {} as Request;
    response = {
      status: (_statusCode: number) => {
        // to be implemented
      },
      json: (_body: any) => {
        // to be implemented
      },
    } as Response;
  });

  it('should be created', () => {
    expect(controller).toBeInstanceOf(AgentController);
  });

  describe('configure route', () => {
    it('should add agent route', () => {
      // Arrange
      router.get = jest.fn();
      // Act
      controller.configureRoutes(router);
      // Assert
      expect(router.get).toHaveBeenCalledWith('/agent', expect.any(Function));
    });

    it('should add default handler for wrong route', () => {
      // Arrange
      router.get = jest.fn();
      // Act
      controller.configureRoutes(router);
      // Assert
      expect(router.get).toHaveBeenCalledWith('/agent*', expect.any(Function));
    });
  });

  describe('handler for not existing routes', () => {
    it('should call the next function on call', () => {
      // Arrange
      const mockGet = jest.fn();
      router.get = mockGet;
      controller.configureRoutes(router);

      next = jest.fn();

      // Act
      routeHandler = mockGet.mock.calls[1][1];
      routeHandler(request, response, next);

      // Assert
      expect(next).toHaveBeenCalledWith(new RouteNotImplementedError());
    });
  });

  describe('when /agent route is called', () => {
    beforeEach(() => {
      const mockGet = jest.fn();
      router.get = mockGet;
      controller.configureRoutes(router);

      routeHandler = mockGet.mock.calls[0][1];
    });

    it('should call getAgentUseCase with correct requestModel', () => {
      // Arrange
      useCase.execute.mockReturnValue(Promise.resolve(responseModel));
      // Act
      routeHandler(request, response, next);
      // Assert
      expect(useCase.execute).toHaveBeenCalledWith({
        user: {
          id: '33399',
        },
      });
    });

    describe('when getAgentUseCase returns ResponseModel', () => {
      let mockStatus: jest.Mock;
      let mockJson: jest.Mock;

      beforeEach(() => {
        mockStatus = jest.fn();
        mockStatus.mockReturnThis();

        mockJson = jest.fn();
        mockJson.mockReturnThis();

        response.status = mockStatus;
        response.json = mockJson;
      });

      it.skip('should response with status 200', () => {
        // Arrange
        useCase.execute.mockResolvedValue(responseModel);
        // Act
        routeHandler(request, response, next);
        // Assert
        expect(response.status).toHaveBeenCalledWith(200);
      });
    });

    describe('when getAgentUseCase throws an error', () => {
      it('should call the next handler with that error', () => {
        // Arrange
        next = jest.fn();
        const error = new Error('Foo Error');
        useCase.execute.mockRejectedValue(error);

        try {
          // Act
          routeHandler(request, response, next);
        } catch (_err) {
          // Assert
          expect(next).toHaveBeenCalledWith(error);
        }
      });
    });
  });
});
