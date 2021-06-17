import { WgWebServiceAdapter } from '../../utils/wg-web-service-adapter';

export interface AgentData {
  PARTNER_NUMBER: string;
  AGENT_NUMBER: string;
  NAME: string;
  NAME2: string;
}

interface WsResultAgentData {
  AGENTS: {
    AGENT: AgentData;
  };
}

export class AgentDataRepository {
  private readonly getAgentDefaultParameter = {
    FUNCTION: 'GET_AGENT',
    SHAPING: 'MULTI_WITH_EXCLUSION',
    AGENT_NUMBER: '',
    AMOUNT: 1,
    API: 'JSON',
  };

  constructor(private webServiceAdapter: WgWebServiceAdapter) {}

  getFor(userId: string): Promise<AgentData | Error> {
    const parameter = {
      ...this.getAgentDefaultParameter,
      AGENT_NUMBER: userId,
    };

    return this.webServiceAdapter
      .call<WsResultAgentData>(parameter)
      .then((responseBody: WsResultAgentData) => {
        return responseBody.AGENTS.AGENT;
      })
      .catch((error: Error) => {
        return error;
      });
  }
}
