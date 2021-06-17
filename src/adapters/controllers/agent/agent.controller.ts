import { CommonRoutesConfig } from '../base/common/common-routes-config';
import { NextFunction, Request, Response, Router } from 'express';
import { GetAgentUseCase } from '../../../app/modules/agent/use-cases/get-agent/get-agent';
import * as getAgentModels from '../../../app/modules/agent/use-cases/get-agent/get-agent.models';
import RouteNotImplementedError from '../../../app/shared/errors/route-not-implemented-error';

export class AgentController extends CommonRoutesConfig {
  protected readonly name = 'AgentController';

  constructor(private getAgentUseCase: GetAgentUseCase) {
    super();
  }

  configureRoutes(router: Router): Router {
    router.get('/agent', this.getAgentHandler.bind(this));
    router.get('/agent*', (_request: Request, _response: Response, next: NextFunction) => {
      next(new RouteNotImplementedError());
    });

    return router;
  }

  private getAgentHandler(_request: Request, response: Response, next: NextFunction): void {
    const requestModel: getAgentModels.RequestModel = {
      user: {
        id: '33399',
      },
    };

    void this.getAgentUseCase
      .execute(requestModel)
      .then((result: getAgentModels.ResponseModel) => {
        response.status(200).json(result);
      })
      .catch(next);
  }
}
