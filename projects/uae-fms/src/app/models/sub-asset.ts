import { IWarrantyItems } from './asset';

export interface ISubasset {
  subAssetTypeId: number;
  makeId: number;
  modelId: number;
  year: number;
  policyTypeId: number;
  purchaseValue: number;
  description: string;
  warrantyItems: IWarrantyItems[];
}
