/* eslint-disable @typescript-eslint/require-await */
import { RequestModel, ResponseModel } from './get-agent.models';
import { AgentEntity } from '../../../../entities/agent/agent';

export class GetAgentUseCase {
  constructor() {}

  async execute(_requestModel: RequestModel): Promise<ResponseModel> | never {
    const result: AgentEntity = null as unknown as AgentEntity;

    if (result) {
      throw result;
    }

    return {
      agent: {
        id: '',
        firstName: '',
        lastName: '',
        locale: '',
      },
    };
  }
}
