export interface IMovementOverView {
  asset: {
    img: string;
    assetName: string;
    assetSubName: string;
    ownership: string;
  };
  duration: string;
  startDate: string;
  endDate: string;
  department: string;
  operator: {
    name: string;
    subName: string;
  };
  fine: number;
  reason: string;
}

export interface IRequests {
  user: {
    img: string;
    userName: string;
    subName: string;
  };
  movementType: string;
  requestType: string;
  assetType: string;
  reason: string;
  date: string;
  requestStatus: string;
  operation: {
    accept: string;
    cancel: string;
  };
}
