import { WgWebServiceAdapter } from '../../utils/wg-web-service-adapter';

export interface AgentLocale {
  COUNTRY: string;
}

interface WsResultAgentLocale {
  ADDRESS: AgentLocale;
}

export class AgentLocaleRepository {
  private readonly getAddressDefaultParameter = {
    FUNCTION: 'GET_ADDRESS',
    SHAPING: 'BY_PARTNER',
    PARTNER_NR: '',
    AMOUNT: 1,
    PAGE: 1,
    API: 'JSON',
  };

  constructor(private webServiceAdapter: WgWebServiceAdapter) {}

  getFor(partnerNumber: string): Promise<AgentLocale | Error> {
    const parameter = {
      ...this.getAddressDefaultParameter,
      PARTNER_NR: partnerNumber,
    };

    return this.webServiceAdapter
      .call<WsResultAgentLocale>(parameter)
      .then((responseBody: WsResultAgentLocale) => responseBody.ADDRESS)
      .catch((error: Error) => {
        return error;
      });
  }
}
