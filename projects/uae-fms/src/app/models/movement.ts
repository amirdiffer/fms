export interface IMovementRequest {
  id: number;
  requester: {
    id: number,
    firstName: string,
    lastName: string
  },
  requestType: string;
  movementType: string;
  assetTypeId: number;
  reason: string;
  quantity: number;
  oldAssetId: number;
  status: string;
  requesterId: number;
  startDate: string;
  endDate: string;
  assetTypeName: string,
  "oldAsset": null
}
export interface IMovementRequestStatistic {
  error:boolean;
  result_number: number;
  total: number;
  waitingForApproval:number;
  approved: number;
  rejected: number;
}

