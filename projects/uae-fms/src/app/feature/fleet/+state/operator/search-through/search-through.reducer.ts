import { createReducer , Action , on } from "@ngrx/store";
import { OperatorSearchThroughActions } from "./search-through.action";
import { initialState  , IOperatorSearchThroughState, operatorSearchThroughAdapter } from "./search-through.entity"
const operatorSearchThroughReducer = createReducer(
    initialState,

    on(OperatorSearchThroughActions.loadAvailableOperatorUser, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),

    on(OperatorSearchThroughActions.allAvailableOperatorUserLoaded, (state, { data }) =>
        operatorSearchThroughAdapter.setAll(data, { ...state, loaded: true, error: null })
    ),


    /* Error */
    on(OperatorSearchThroughActions.error, (state, { reason }) => ({
        ...state,
        error: reason,
        loaded: true
    })),

)

export function reducer(state: IOperatorSearchThroughState, action: Action) {
    return operatorSearchThroughReducer(state, action);
}
