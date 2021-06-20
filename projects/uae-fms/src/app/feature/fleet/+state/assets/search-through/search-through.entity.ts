import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";



export const FLEET_ASSET_SEARCH_THROUGH_FEATURE_KEY = 'assetSearchThrough';

export interface IAssetSearchThrough {
    dpd:string;
    id:number
}


export interface IAssetSearchThroughState extends EntityState<IAssetSearchThrough> {
    error?: any;
    loaded?: boolean;
    message?: string;
}

export const assetSearchThroughAdapter: EntityAdapter<IAssetSearchThrough> = createEntityAdapter<IAssetSearchThrough>();

export const initialState: IAssetSearchThroughState = assetSearchThroughAdapter.getInitialState(
    {
      loaded: null,
      message: null,
      error: null,
    } as IAssetSearchThroughState
  );