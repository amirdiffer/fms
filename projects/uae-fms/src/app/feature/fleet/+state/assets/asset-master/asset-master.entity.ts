import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface IAssetMasterModel {
  asset: {
    img: string,
    assetName: string,
    assetSubName: string,
    ownership: string
  },
  type: string,
  businessCategory: string,
  allocated: string,
  operator: string,
  status: string,
  submitOn: string,
  brand: string,
  killometer: number,
  statusColor: string
}

export interface IAssetMasterState extends EntityState<IAssetMasterModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export const FLEET_ASSET_MASTER_FEATURE_KEY = 'assetMaster';

export interface IAssetMasterPartialState {
  [FLEET_ASSET_MASTER_FEATURE_KEY]: IAssetMasterState;
}

export const assetMasterAdapter: EntityAdapter<IAssetMasterModel> = createEntityAdapter<
  IAssetMasterModel
>();

export const initialState: IAssetMasterState = assetMasterAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as IAssetMasterState
);
