import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export const TRAFFIC_FINES_ASSET_TRAFFIC_FINE_TABLE_FEATURE_KEY ='assetTrafficFine';

export interface IAssetTrafficFineStateModel{
    asset:{
        name:string;
        dpd: string;
        ownership:string;
        thumb:string;
    }
    plateNumber: string;
    type: string;
    operator: string;
    status: string;
    businessCategory: string;
    totalFines: string;
    amount:string;
}

export interface IAssetTrafficFineState extends EntityState<IAssetTrafficFineStateModel>{
    error?: any;
    loaded?: boolean;
    message?: string;
}

export interface IAssetTrafficFinePartialState{
    [TRAFFIC_FINES_ASSET_TRAFFIC_FINE_TABLE_FEATURE_KEY]: IAssetTrafficFineState;
}
export const assetTrafficFineAdapter : EntityAdapter<IAssetTrafficFineStateModel> = createEntityAdapter<IAssetTrafficFineStateModel>();

export const initialState: IAssetTrafficFineState = assetTrafficFineAdapter.getInitialState({
    error: null,
    loaded: null,
    message: null  
} as IAssetTrafficFineState);