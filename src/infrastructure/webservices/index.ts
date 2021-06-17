import { AgentDataRepository } from './agent/agent-data.repository';
import { AgentLocaleRepository } from './agent/agent-locale.repository';
import { DocumentsRepository } from './document/documents.repository';
import { ManufacturerRepository } from './manufacturer/manufacturer.repository';
import utils from '../utils';

function makeAgentDataWs(): AgentDataRepository {
  return new AgentDataRepository(utils.wgWebServiceAdapter);
}

function makeAgentLocaleWs(): AgentLocaleRepository {
  return new AgentLocaleRepository(utils.wgWebServiceAdapter);
}

function makeDocumentsWS(): DocumentsRepository {
  return new DocumentsRepository(utils.wgWebServiceAdapter);
}

function makeManufacturerWs(): ManufacturerRepository {
  return new ManufacturerRepository(utils.wgWebServiceAdapter);
}

const agentData = makeAgentDataWs();
const agentLocale = makeAgentLocaleWs();
const documents = makeDocumentsWS();
const manufacturer = makeManufacturerWs();

const infrastructure = {
  webservice: {
    agentData,
    agentLocale,
    documents,
    manufacturer,
  },
};

export default infrastructure;
