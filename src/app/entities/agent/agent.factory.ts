import { AgentEntity, AgentEntityDto } from './agent';

export class AgentEntityFactory {
  create(options: AgentEntityDto): AgentEntity {
    return new AgentEntity(options);
  }
}
