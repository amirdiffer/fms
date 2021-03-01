import { IGeneralResponse } from './general-response';

export interface ITollStatistics extends IGeneralResponse {
  total: number;
  available: number;
  assigned: number;
}

export interface IAccessoryStatistics {
  total: number;
  available: number;
  assigned: number;
  xAccessory: number;
}

export interface IAssetStatistics extends IGeneralResponse {
  result_number: number;
  total: number;
  active: number;
  inactive: number;
  xfleet: number;
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

export interface ISubAssetStatistics extends IGeneralResponse {
  result_number: number;
}

export interface IUserStatistics extends IGeneralResponse {
  result_number: number;
}
