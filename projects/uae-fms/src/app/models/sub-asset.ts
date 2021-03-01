import { IWarrantyItems } from './asset';

export interface ISubasset {
  id: number;
  subAssetTypeId: number;
  makeId: number;
  modelId: number;
  year: number;
  policyTypeId: number;
  purchaseValue: number;
  description: string;
  warrantyItems: IWarrantyItems[];
  avatarId: number;
  dpd: string;
  date: string;
  warrantyExpireDate: string;
}
