import { createReducer, on , Action } from "@ngrx/store";
import { AssetTrafficFineActions } from "./asset-traffic-fine.actions";
import { assetTrafficFineAdapter, IAssetTrafficFineState, initialState } from "./asset-traffic-fine.entity"


const assetTrafficFineReducer = createReducer(
    initialState,
    on(AssetTrafficFineActions.loadAll , (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(AssetTrafficFineActions.allDataLoaded , (state , { data }) => assetTrafficFineAdapter.setAll(
        data,{...state, loaded: true, error: null}
    )),
    on(AssetTrafficFineActions.error , (state , {reason}) => ({
        ...state,
        error: reason,
        loaded: true 
    }))
);



export function reducer (state: IAssetTrafficFineState , action: Action){
    return assetTrafficFineReducer(state, action)
}