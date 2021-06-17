import { DocumentLanguage, DocumentTypes, VwtAppCode } from './document.models';
import { WgWebServiceAdapter } from '../../utils/wg-web-service-adapter';

interface WsResultDocument {
  DOCUMENT: {
    CONTENT: string;
  };
}

export class DocumentsRepository {
  private readonly getDocumentDefaultParameter = {
    FUNCTION: 'GET_PRODUCT_DATA',
    SHAPING: 'LEGAL_DOCUMENTS',
    APPLICATION_CODE: '',
    PRODUCT_TYPE: 'REPARATURKOSTENSCHUTZ_RAD_2021',
    DOCUMENT_TYPE: '',
    LANGUAGE: '',
    API: 'JSON',
  };

  constructor(private webServiceAdapter: WgWebServiceAdapter) {}

  async getDocument(documentType: DocumentTypes, language: DocumentLanguage): Promise<string | Error> {
    const parameter = {
      ...this.getDocumentDefaultParameter,
      LANGUAGE: language,
      DOCUMENT_TYPE: documentType,
      APPLICATION_CODE: this.getApplicationCode(language),
    };

    return this.webServiceAdapter
      .call<WsResultDocument>(parameter)
      .then((responseBody: WsResultDocument) => responseBody.DOCUMENT.CONTENT)
      .catch((error: Error) => {
        // adding additional infos to error object
        return error;
      });
  }

  private getApplicationCode(_language: DocumentLanguage): string {
    return VwtAppCode.DE;
  }
}
