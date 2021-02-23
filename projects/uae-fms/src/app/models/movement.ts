export interface IMovement {
  id: number;
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
}
