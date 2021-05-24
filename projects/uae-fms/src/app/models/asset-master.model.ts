import { IWarrantyItems } from './asset';

export interface IAssetMaster {
  id?: number;
  avatarId?: number;
  dpd?: string;
  ownershipId?: number;
  assetTypeId?: number;
  createdAt?: string;
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
  policyTypeId?: number;
  policyTypeName?: string;
  inServiceDate?: string;
  inServiceOdometer?: number;
  periodicServiceId?: number;
  periodicServiceName?: string;
  purchaseValue?: number;
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
  description?: string;
  warranties?: IWarranty[];
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

export interface IWarranty {
  id?: number;
  item: string;
  periodType: string;
  duration: number;
  startDate: string;
  docId: number;
  hasReminder: boolean;
}

export interface IAssetOverview {
  numOfActiveAssets?: number;
  numOfAssetsByBusinessCategory?: IAssetsByBusinessCategory[];
  numOfAssetsByOrganization?: IAssetsByOrganization[];
  numOfCustomizedAssets?: number;
  numOfInactiveAssets?: number;
  numOfRegisteredAssets?: number;
  numOfXFleetAssets?: number;
  totalNumberOfAssets?: number;
}

export interface IAssetsByBusinessCategory {
  businessCategoryId: number;
  businessCategoryName: string;
  numOfAssets: number;
}

export interface IAssetsByOrganization {
  numOfAssets: number;
  organizationId: number;
  organizationName: string;
}
