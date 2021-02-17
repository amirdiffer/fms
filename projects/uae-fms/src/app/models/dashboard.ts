export interface Dashboard {
  assetStatus: AssetStatus;
  activeAssets: ActiveAsset;
  suppliers: Supplier;
  businessCategory: BusinessCategory;
  factoryCategory: FactoryCategory;
}

export interface AssetStatus {
  active: number;
  defleet: number;
  reused: number;
  totlaLost: number;
}

export interface ActiveAsset {
  permanent: number;
  iserve: number;
  sharedPool: number;
  temprary: number;
  workshop: number;
}

export interface Supplier {
  vehicle: Car[];
}

export interface Car {
  brand: string;
  id: number;
  precentage: number;
}

export interface BusinessCategory {
  name: string;
  totalSubAsset: number;
  totlaAccessory: number;
  total: string;
}

export interface FactoryCategory {
  name: string;
  totalSubAsset: number;
  totlaAccessory: number;
  total: string;
}
