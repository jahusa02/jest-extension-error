export interface AgentEntityDto {
  id: string;
  partnerNumber: string;
  agentNumber: string;
  firstName: string;
  lastName: string;
  locale: string;
}

export class AgentEntity {
  constructor(private data: AgentEntityDto) {}

  getId(): string {
    return this.data.partnerNumber;
  }

  getPartnerNumber(): string {
    return this.data.partnerNumber;
  }

  getAgentNumber(): string {
    return this.data.agentNumber;
  }

  getFirstName(): string {
    return this.data.firstName;
  }

  getLastName(): string {
    return this.data.lastName;
  }

  getLocale(): string {
    return this.data.locale.toLowerCase() + '-de';
  }
}
