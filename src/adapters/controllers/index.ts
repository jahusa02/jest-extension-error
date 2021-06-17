import { CommonRoutesConfig } from './base/common/common-routes-config';
import { AgentController } from './agent/agent.controller';
import { agentUseCases } from '../../app/modules/agent/use-cases';

function makeAgentController(): CommonRoutesConfig {
  return new AgentController(agentUseCases.getAgent);
}

const agentController = makeAgentController();

const controller = {
  agentController,
};

export default controller;
