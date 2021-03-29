export interface IAssetMaster {
  id?: number;
  avatarId?: number;
  dpd?: string;
  ownershipId?: number;
  assetTypeId?: number;
  makeId?: number;
  modelId?: number;
  businessCategoryId?: number;
  department?: IDepartment;
  operator?: IOperator;
  progressStatus?: string;
  date?: string;
  meterType?: string;
  meterValue?: number;
  status: string;
  assetTypeName: string;
  colorId: number;
  colorName: string;
  fuelCardId: number;
  makeName: string;
  modelName: string;
  plateNumber: number;
  tollId: number;
  trimId: number;
  trimName: string;
  year: string;
}

export interface IOperator {
  id?: number;
  firstName?: string;
  lastName?: string;
}

export interface IDepartment {
  id?: number;
  name?: string;
  organizationId?: number;
  organizationName?: string;
}
