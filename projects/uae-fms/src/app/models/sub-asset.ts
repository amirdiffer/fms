
export interface ISubasset {
  id?: number;
  assetTypeId: number;
  makeId: number;
  modelId: number;
  year: number;
  policyTypeId: number;
  purchaseValue: number;
  description: string;
  warrantyItems: IWarrantyItems[];
  avatarId: number;
  dpd: string;
  date?: string;
  warrantyExpireDate?: string;
  assetTypeName?;
  modelName?;
  makeName?;
  policyTypeName?;
}
export interface IWarrantyItems {
  id?:number;
  item: string;
  periodType: string;
  duration: number;
  startDate: string;
  docId: number;
  hasReminder:boolean;
}