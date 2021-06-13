import { createReducer, on , Action } from "@ngrx/store";
import { AssetSearchThroughActions } from "./search-through.actions";
import { assetSearchThroughAdapter, IAssetSearchThroughState, initialState  } from "./search-through.entity"


const assetSearchThroughReducer = createReducer(
    initialState,


    /* All Available Assets */
    on(AssetSearchThroughActions.loadAvailableAsset, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(AssetSearchThroughActions.allAvailableAsset, (state, { data }) =>
        assetSearchThroughAdapter.setAll(data, { ...state, loaded: true, error: null })
    ),


    /* All Available Asset For Adding Request*/
    on(AssetSearchThroughActions.loadAvailableAssetForAddingRequest, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(AssetSearchThroughActions.allAvailableAssetForAddingRequestLoaded, (state, { data }) =>
        assetSearchThroughAdapter.setAll(data, { ...state, loaded: true, error: null })
    ),


    /* All Available Asset For Adding Job Card*/
    on(AssetSearchThroughActions.loadAvailableAssetForAddingJobCard, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(AssetSearchThroughActions.allAvailableAssetForAddingJobCardLoaded, (state, { data }) =>
        assetSearchThroughAdapter.setAll(data, { ...state, loaded: true, error: null })
    ),
)


export function reducer(state: IAssetSearchThroughState, action: Action) {
    return assetSearchThroughReducer(state, action);
  }