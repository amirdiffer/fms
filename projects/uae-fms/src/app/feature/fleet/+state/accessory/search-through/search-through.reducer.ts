import { createReducer , Action , on } from "@ngrx/store";
import { AccessorySearchThroughActions } from "./search-through.action";
import { initialState , accessorySearchThroughAdapter , IAccessorySearchThroughState } from "./search-through.entity"
const accessorySearchThroughReducer = createReducer(
    initialState,

    on(AccessorySearchThroughActions.loadAvailableAccessory, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),

    on(AccessorySearchThroughActions.allAvailableAccessoryLoaded, (state, { data }) =>
    accessorySearchThroughAdapter.setAll(data, { ...state, loaded: true, error: null })
    ),


    /* Error */
    on(AccessorySearchThroughActions.error, (state, { reason }) => ({
        ...state,
        error: reason,
        loaded: true
    })),

)

export function reducer(state: IAccessorySearchThroughState, action: Action) {
    return accessorySearchThroughReducer(state, action);
}
