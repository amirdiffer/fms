import { initialState , accessoryTypeAdapter , AccessoryTypeState } from './accessory-type.entity'
import { Action, createReducer, on } from '@ngrx/store';
import { AccessoryTypeActions } from './accessory-type.actions';

const accessoryTypeReducer = createReducer(
    initialState,

    /* Load Accessory Type */
    on(AccessoryTypeActions.loadAll, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(AccessoryTypeActions.allDataLoaded, (state, { data }) =>
    accessoryTypeAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })),


    /* Add Accessory Type */
    on(AccessoryTypeActions.addAccessoryType, (state, { data: any }) => ({
        ...state,
        submitted: false
    })),
    on(AccessoryTypeActions.accessoryTypeAddedSuccessfully, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: true
    })),

    /* Update Accessory Type */
    on(AccessoryTypeActions.updateAccessoryType, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: false
    })),
    on(AccessoryTypeActions.accessoryUpdatedSuccessfully, (state, { data }) =>
        accessoryTypeAdapter.updateOne(
            { changes: data, id: data.id },
            {
            ...state,
            error: null,
            message: null,
            submitted: true
            }
        )
    ),


    /* Get Accessory Type By Id*/
    on(AccessoryTypeActions.accessoryTypeById, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(AccessoryTypeActions.accessoryTypeByIdLoaded, (state, { data }) => ({
        ...state,
        loaded: true,
        error: null,
        accessoryType: data
    })),

     /* Error */
    on(AccessoryTypeActions.error, (state, { reason }) => ({
        ...state,
        error: reason,
        loaded: true
    })),


    /* Reset Params */
    on(AccessoryTypeActions.resetParams, (state) => ({
        ...state,
        error: null,
        message: null,
        submitted: false
    })),
)



export function reducer(state: AccessoryTypeState, action: Action) {
    return accessoryTypeReducer(state, action);
}