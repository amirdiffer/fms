export interface IAsset {
  businessCategoryId: number;
  ownershipId: number;
  year: number;
  makeId: number;
  modelId: number;
  colorId: number;
  trim: string;
  origin: string;
  meterType: string;
  organizationId: number;
  departmentId: number;
  operatorId: number;
  vehicleDocIds: number[];
  policyTypeId: number;
  purchaseValue: number;
  inServiceDate: string;
  inServiceOdometer: number;
  purchaseDocId: number;
  periodicServiceId: number;
  createdAt?:string;
  warrantyItems: IWarrantyItems[];
  description: string;
  dpds: IDpds[];
}

export interface IWarrantyItems {
  id?:number;
  item: string;
  periodType: string;
  duration: number;
  warrantyStartDate: string;
  warrantyDocId: number;
}

export interface IDpds {
  shortITCode: string;
  serialNumber: string;
}
