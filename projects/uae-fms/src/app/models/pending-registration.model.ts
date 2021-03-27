export interface IPendingRegistration {
  id?: number;
  avatarId?: number;
  dpd?: string;
  ownerShipId?: number;
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
