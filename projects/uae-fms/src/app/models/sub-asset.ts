
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
  serialNumber: string;
  date?: string;
  createdAt?:string;
  warrantyExpireDate?: string;
  assetTypeName?;
  modelName?;
  makeName?;
  policyTypeName?;
  type?;
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


export interface ISubAssetType{
  id: number;
  name: string;
  type?: string;
  description: string;
  isActive: false;
  makes?: Make[];
}

export interface Make {
  id: number;
  name: string;
  models?: MakeModel[];
  description?: string;
  totalMakeCount?: number;
}

export interface MakeModel {
  id?: number;
  name?: string;
  description?:string;
}
