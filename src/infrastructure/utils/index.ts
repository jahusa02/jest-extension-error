import { WgWebServiceAdapter } from './wg-web-service-adapter';
import shared from '../../adapters/services';

function makeWgWebServiceAdapter(): WgWebServiceAdapter {
  return new WgWebServiceAdapter(shared.sessionService, shared.httpClientAdapter, '');
}

const utils = {
  wgWebServiceAdapter: makeWgWebServiceAdapter(),
};

export default utils;
