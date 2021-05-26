import { IGeneralResponse } from './general-response';

export interface ITollStatistics extends IGeneralResponse {
  total: number;
  available: number;
  assigned: number;
}

export interface IAccessoryStatistics extends IGeneralResponse {
  total: number;
  available: number;
  assigned: number;
  xAccessory: number;
}

export interface IAssetStatistics extends IGeneralResponse {
  result_number: number;
  message: {
    total: number;
    active: number;
    inactive: number;
    xfleet: number;
  };
}

export interface IMovementStatistics extends IGeneralResponse {
  result_number: number;
  total: number;
  waitingForApproval: number;
  approved: number;
  rejected: number;
}

export interface IOperatorStatistics extends IGeneralResponse {
  result_number: number;
}

export interface IOperatorTrafficFineStatistics extends IGeneralResponse {
  result_number: number;
}

export interface ISubAssetStatistics extends IGeneralResponse {
  result_number: number;
  total: number;
  active: number;
  inactive: number;
  xSubAsset: number;
}

export interface IUserStatistics extends IGeneralResponse {
  totalUserNumber?: number;
  activeUsersNumber: number;
  inActiveUsersNumber: number;
}

export interface IBodyShopRequestStatistics {
  total: number;
  approved: number;
  waitingForApproval: number;
  rejected: number;
}

export interface IFuelManagementStatistics extends IGeneralResponse {
  total: number;
  available: number;
  assigned: number;
}

export interface ITrafficFineStatistics extends IGeneralResponse {
  message: {
    deducted: number;
    paid: number;
    total: number;
    unpaid: number;
  };
}

export interface IPartListStatistics extends IGeneralResponse {
  message: {
    total: number;
    available: number;
    need_to_order: number;
    unavailable: number;
  };
}

export interface IOperatorOverview {
  totalNumOfOperators?: number;
  totalAmountOfFines?: number;
  numOfActiveOperators?: number;
  numOfInactiveOperators?: number;
  lowestFinedOperator?: object;
  highestFinedOperator?: object;
}
