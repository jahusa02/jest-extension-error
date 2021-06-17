import { GetAgentUseCase } from './get-agent';
import { RequestModel } from './get-agent.models';

describe('use-case get agent', () => {
  let useCase: GetAgentUseCase;

  let userId: string;
  let requestModel: RequestModel;

  beforeEach(() => {
    userId = 'MyUserId';
    requestModel = {
      user: {
        id: userId,
      },
    };
  });

  it.skip('should be created', () => {
    expect(useCase).toBeInstanceOf(GetAgentUseCase);
  });

  describe('execute', () => {
    it.skip('should call entities from the gateway', async () => {
      await useCase.execute(requestModel);
    });

    describe('gateway returns an agent entity', () => {
      it('should return responseModel with agent when gateway returns an entity', async () => {
        expect(null).toMatchSnapshot();
      });
    });

    describe('gateway returns a failure', () => {
      it('should throw an error if gateway returns a failure', () => {
        expect(null).toBe(null);
      });
    });
  });
});
