import { AgentEntityFactory } from './entities/agent/agent.factory';
import { DocumentEntityFactory } from './entities/document/document.factory';
import { ManufacturerEntityFactory } from './entities/manufacturer/manufacturer.factory';
import { FailureFactory } from './entities/failure/failure.factory';

const entities = {
  agentFactory: new AgentEntityFactory(),
  documentsFactory: new DocumentEntityFactory(),
  manufacturerFactory: new ManufacturerEntityFactory(),
  failureFactory: new FailureFactory(),
};

export default entities;
