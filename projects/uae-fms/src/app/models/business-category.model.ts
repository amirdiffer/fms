import { IGeneralResponse } from '@models/general-response';

export interface IBusinessCategory extends IGeneralResponse {
  id: number;
  name: string;
  status: string;
  description: string;
  assetTypeId: number;
  subAssetsCount: number;
  accessoriesCount: number;
}
