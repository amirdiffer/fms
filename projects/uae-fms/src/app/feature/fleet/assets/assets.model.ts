export interface IAssets {
  asset: {
    img: string;
    assetName: string;
    assetSubName: string;
    ownership: string;
  };
  type: string;
  businessCategory: string;
  allocated: string;
  operator: string;
  status: string;
  submitOn: string;
  brand: string;
  killometer: number;
  statusColor: string;
}

export interface IPending {
  asset: {
    img: string;
    assetName: string;
    assetSubName: string;
    progress: number;
  };
  serialNumber: string;
  brand: string;
  type: string;
  businessCategory: string;
  createDate: string;
  registrantionDate: string;
  creator: string;
}
