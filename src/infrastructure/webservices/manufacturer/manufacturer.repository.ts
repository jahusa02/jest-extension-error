import { ManufacturerListItem, MappedManufacturerList } from './manufacturer.models';
import { WgWebServiceAdapter } from '../../utils/wg-web-service-adapter';

interface ManufacturerListResponse {
  MANUFACTURER_LIST: {
    MANUFACTURER: Array<string>;
    MANUFACTURER_CODE: Array<string>;
  };
}

export class ManufacturerRepository {
  private readonly getManufacturerListDefaults = {
    FUNCTION: 'GET_OBJECT_DETAILS',
    SHAPING: 'MANUFACTURER_CUSTOM',
    LIST_NAME: 'SoGkz 270038',
    API: 'JSON',
  };

  constructor(private webServiceAdapter: WgWebServiceAdapter) {}

  async getShortList(): Promise<MappedManufacturerList | Error> {
    return this.webServiceAdapter
      .call<ManufacturerListResponse>(this.getManufacturerListDefaults)
      .then((response: ManufacturerListResponse) => this.getList(response))
      .catch((error: Error) => {
        // adding additional infos to error object
        return error;
      });
  }

  private getList(manufacturerList: ManufacturerListResponse): MappedManufacturerList {
    const manufacturer = manufacturerList.MANUFACTURER_LIST.MANUFACTURER;
    const code = manufacturerList.MANUFACTURER_LIST.MANUFACTURER_CODE;

    return manufacturer.reduce((result: Array<ManufacturerListItem>, currentName: string, index: number) => {
      result.push({
        name: currentName,
        id: code[index],
      });
      return result;
    }, []);
  }
}
