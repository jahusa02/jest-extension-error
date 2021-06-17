import { GetAgentUseCase } from './get-agent/get-agent';

const makeGetAgentUseCase = (): GetAgentUseCase => {
  return new GetAgentUseCase();
};

export const agentUseCases = {
  getAgent: makeGetAgentUseCase(),
};
