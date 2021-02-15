import { initialState  , assetUsageAdapter, IAssetUsageState} from "./asset-usage.entity";
import { createReducer, on ,Action} from "@ngrx/store";
import { AssetUsageActions } from "./asset-usage.actions";

const assetUsageReducer = createReducer(
    initialState,
    on(AssetUsageActions.loadAssetUsage, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message:null
    })),
    on(AssetUsageActions.assetUsageLoaded, (state , {data}) => 
        assetUsageAdapter.setAll(data, {...state , loaded: true, error: null})
    ),
    on(AssetUsageActions.assetUsageError, (state, {reason}) =>({
        ...state,
        error: reason,
        loaded: true
    }))
);

export function reducer(state: IAssetUsageState , action: Action){
    return assetUsageReducer(state,action)
}