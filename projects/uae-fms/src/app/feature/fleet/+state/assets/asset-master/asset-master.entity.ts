import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IAssetStatistics } from '@models/statistics';

export interface IAssetMasterModel {
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

export interface IAssetMasterState extends EntityState<IAssetMasterModel> {
  error?: any;
  loaded: boolean;
  statistics: IAssetStatistics;
  message: string;
}

export const FLEET_ASSET_MASTER_FEATURE_KEY = 'assetMaster';

export interface IAssetMasterPartialState {
  [FLEET_ASSET_MASTER_FEATURE_KEY]: IAssetMasterState;
}

export const assetMasterAdapter: EntityAdapter<
  IAssetMasterModel | IAssetStatistics
> = createEntityAdapter<IAssetMasterModel | IAssetStatistics>({
  // TODO: the API response comes with no ID and ngrx tells us that every entity needs an ID so here temporarily I added
  // TODO: this ID. But later we need to change this ID to IAsset ID to ensure that statistic entity takes the asset ID
  selectId: (statistics: IAssetStatistics) => statistics.result_number
});

export const initialState: IAssetMasterState = assetMasterAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    statistics: null,
    error: null
  } as IAssetMasterState
);
