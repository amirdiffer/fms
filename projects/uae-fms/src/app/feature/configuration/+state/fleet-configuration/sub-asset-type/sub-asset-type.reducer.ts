import { Action, createReducer, on } from '@ngrx/store';
import { SubAssetTypeActions } from './sub-asset-type.actions';
import { initialState, subAssetTypeAdapter, SubAssetTypeState } from './sub-asset-type.entity'


const subAssetTypeReducer = createReducer(
    initialState,

    /* Load Sub Asset Type */
    on(SubAssetTypeActions.loadAll, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(SubAssetTypeActions.allDataLoaded, (state, { data }) =>
        subAssetTypeAdapter.setAll(data, {
            ...state,
            loaded: true,
            error: null
    })),


    /* Load Sub Asset Type By Id */
    on(SubAssetTypeActions.subAssetTypeById, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(SubAssetTypeActions.subAssetByIdLoaded, (state, { data }) => ({
        ...state,
        loaded: true,
        error: null,
        subAssetType: data
    })),


    /* Add Sub Asset Type */
    on(SubAssetTypeActions.addSubAssetType, (state, { data: any }) => ({
        ...state,
        submitted: false
    })),
    on(SubAssetTypeActions.subAssetTypeAddedSuccessfully, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: true
    })),


    /* Update Sub Asset Type */
    on(SubAssetTypeActions.updateSubAssetType, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: false
    })),
    on(SubAssetTypeActions.subAssetTypeUpdatedSuccessfully, (state, { data }) =>
        subAssetTypeAdapter.updateOne(
          { changes: data, id: data.id },
          {
            ...state,
            error: null,
            message: null,
            submitted: true
          }
        )
    ),



    /* Add Make */
    on(SubAssetTypeActions.addMake, (state, { data: any }) => ({
        ...state,
        submitted: false
    })),
    on(SubAssetTypeActions.makeAddedSuccessfully, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: true
    })),

    /* Update Sub Asset Make */
    on(SubAssetTypeActions.updateMake, (state, { data }) => ({
      ...state,
      error: null,
      message: null,
      submitted: false
    })),
    on(SubAssetTypeActions.makeUpdatedSuccessfully, (state, { data }) =>
      subAssetTypeAdapter.updateOne(
        { changes: data, id: data.id },
        {
          ...state,
          error: null,
          message: null,
          submitted: true
        }
      )
    ),

    /* Add Model */
    on(SubAssetTypeActions.addModel, (state, { data: any }) => ({
        ...state,
        submitted: false
      })),
    on(SubAssetTypeActions.modelAddedSuccessfully, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: true
    })),

    /* Update Sub Asset Model */
    on(SubAssetTypeActions.updateModel, (state, { data }) => ({
      ...state,
      error: null,
      message: null,
      submitted: false
    })),
    on(SubAssetTypeActions.modelUpdatedSuccessfully, (state, { data }) =>
      subAssetTypeAdapter.updateOne(
        { changes: data, id: data.id },
        {
          ...state,
          error: null,
          message: null,
          submitted: true
        }
      )
    ),

    /* Error */
    on(SubAssetTypeActions.error, (state, { reason }) => ({
        ...state,
        error: reason,
        loaded: true
    })),


    /* Reset Params */
    on(SubAssetTypeActions.resetParams, (state) => ({
        ...state,
        error: null,
        message: null,
        submitted: false
    })),
)



export function reducer(state: SubAssetTypeState, action: Action) {
    return subAssetTypeReducer(state, action);
}
