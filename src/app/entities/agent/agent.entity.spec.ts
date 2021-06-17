import { AgentEntityFactory } from './agent.factory';
import { AgentEntity, AgentEntityDto } from './agent';

describe('agent entity', () => {
  let factory: AgentEntityFactory;

  const options: AgentEntityDto = {
    id: 'myId',
    agentNumber: '0123',
    firstName: 'Foo',
    lastName: 'Bar',
    locale: 'de',
    partnerNumber: '3456',
  };

  beforeEach(() => {
    factory = new AgentEntityFactory();
  });

  describe('AgentEntityFactory', () => {
    it('should be created', () => {
      expect(factory).toBeDefined();
    });

    it('should return an instance of AgentEntity', () => {
      expect(factory.create(options)).toBeInstanceOf(AgentEntity);
    });
  });

  describe('AgentEntity', () => {
    it('should contain given options', () => {
      // Arrange
      const entity: AgentEntity = factory.create(options);
      // Act
      const data = {
        id: entity.getId(),
        agentNumber: entity.getAgentNumber(),
        firstName: entity.getFirstName(),
        lastName: entity.getLastName(),
        locale: entity.getLocale(),
        partnerNumber: entity.getPartnerNumber(),
      };
      // Assert
      expect(data).toMatchSnapshot();
    });
  });
});
