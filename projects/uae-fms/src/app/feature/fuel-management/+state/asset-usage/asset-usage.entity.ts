import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FUEL_MANAGEMENT_ASSET_USAGE_FEATURE_KEY = 'assetUsage';

export interface IAssetUsageStateModel {
  id: number;
  asset: {
    assetName: string;
    assetSubName: string;
    ownership: string;
    img: string;
  };
  plateNumber: string;
  tageNo: string;
  date: string;
  amount: string;
  mileage: string;
  totalUsage: string;
  cost: string;
  cardType: string;
}

export interface IAssetUsageState extends EntityState<IAssetUsageStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface IAssetUsagePartialState {
  [FUEL_MANAGEMENT_ASSET_USAGE_FEATURE_KEY]: IAssetUsageState;
}

export const assetUsageAdapter: EntityAdapter<IAssetUsageStateModel> = createEntityAdapter<
  IAssetUsageStateModel
>();

export const initialState: IAssetUsageState = assetUsageAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as IAssetUsageState
);
