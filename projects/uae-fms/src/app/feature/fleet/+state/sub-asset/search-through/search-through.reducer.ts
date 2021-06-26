import { createReducer , Action , on } from "@ngrx/store";
import { SubAssetSearchThroughActions } from "./search-through.action";
import { initialState , subAssetSearchThroughAdapter , ISubAssetSearchThroughState } from "./search-through.entity"
const subAssetSearchThroughReducer = createReducer(
    initialState,

    on(SubAssetSearchThroughActions.loadAvailableSubAssetWithModelId, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),

    on(SubAssetSearchThroughActions.allAvailableSubAssetWithModelIdLoaded, (state, { data }) =>
    subAssetSearchThroughAdapter.setAll(data, { ...state, loaded: true, error: null })
    ),


    /* Error */
    on(SubAssetSearchThroughActions.error, (state, { reason }) => ({
        ...state,
        error: reason,
        loaded: false
    })),

)

export function reducer(state: ISubAssetSearchThroughState, action: Action) {
    return subAssetSearchThroughReducer(state, action);
}
