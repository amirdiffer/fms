import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


export const FLEET_SUB_ASSET_SEARCH_THROUGH_FEATURE_KEY = 'subAssetSearchThrough';

export interface ISubAssetSearchThrough {
    name:string;
    id:number
}


export interface ISubAssetSearchThroughState extends EntityState<ISubAssetSearchThrough> {
    error?: any;
    loaded?: boolean;
    message?: string;
}


export const subAssetSearchThroughAdapter: EntityAdapter<ISubAssetSearchThrough> = createEntityAdapter<ISubAssetSearchThrough>();


export const initialState: ISubAssetSearchThroughState = subAssetSearchThroughAdapter.getInitialState(
    {
      loaded: null,
      message: null,
      error: null,
    } as ISubAssetSearchThroughState
  );
