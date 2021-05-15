import {
    assetTypeAdapter,
    AssetTypeState,
    initialState
} from './asset-type.entity';
import { Action, createReducer, on } from '@ngrx/store';
import { AssetTypeActions } from './asset-type.action';

const assetTypeReducer = createReducer(
    initialState,

    /* Load Asset Type */
    on(AssetTypeActions.loadAll, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(AssetTypeActions.allDataLoaded, (state, { data }) =>
    assetTypeAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })),


    /* Load Asset By Id */
    on(AssetTypeActions.assetTypeById, (state) => ({
        ...state,
        loaded: false,
        error: null,
        message: null
    })),
    on(AssetTypeActions.assetTypeByIdLoaded, (state, { data }) => ({
        ...state,
        loaded: true,
        error: null,
        assetType: data
    })),


    /* Add Asset Type */
    on(AssetTypeActions.addAssetType, (state, { data: any }) => ({
        ...state,
        submitted: false
    })),
    on(AssetTypeActions.assetTypeAddedSuccessfully, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: true
    })),

    /* Update Asset Type */
    on(AssetTypeActions.updateAssetType, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: false
      })),
      on(AssetTypeActions.assetTypeUpdated, (state, { data }) =>
        assetTypeAdapter.updateOne(
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
    on(AssetTypeActions.addMake, (state, { data: any }) => ({
        ...state,
        submitted: false
    })),
    on(AssetTypeActions.makeAddedSuccessfully, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: true
    })),

    /* Update Make */
    on(AssetTypeActions.updateMake, (state, { data }) => ({
      ...state,
      error: null,
      message: null,
      submitted: false
    })),
    on(AssetTypeActions.makeUpdatedSuccessfully, (state, { data }) =>
      assetTypeAdapter.updateOne(
        { changes: data, id: data.id },
        {
          ...state,
          error: null,
          message: null,
          submitted: true
        })
    ),

    /* Add Model */
    on(AssetTypeActions.addModel, (state, { data: any }) => ({
        ...state,
        submitted: false
      })),
    on(AssetTypeActions.modelAddedSuccessfully, (state, { data }) => ({
        ...state,
        error: null,
        message: null,
        submitted: true
    })),


    /* Update Model */
    on(AssetTypeActions.updateModel, (state, { data }) => ({
      ...state,
      error: null,
      message: null,
      submitted: false
    })),
    on(AssetTypeActions.modelUpdatedSuccessfully, (state, { data }) =>
      assetTypeAdapter.updateOne(
        { changes: data, id: data.id },
        {
          ...state,
          error: null,
          message: null,
          submitted: true
        })
    ),

    /* Add Trim */
    on(AssetTypeActions.addTrim, (state, { data: any }) => ({
        ...state,
        submitted: false
      })),
    on(AssetTypeActions.trimAddedSuccessfully, (state, { data }) => ({
    ...state,
        error: null,
        message: null,
        submitted: true
    })),


    /* Update Trim */
    on(AssetTypeActions.updateTrim, (state, { data }) => ({
      ...state,
      error: null,
      message: null,
      submitted: false
    })),
    on(AssetTypeActions.trimUpdatedSuccessfully, (state, { data }) =>
      assetTypeAdapter.updateOne(
        { changes: data, id: data.id },
        {
          ...state,
          error: null,
          message: null,
          submitted: true
        })
    ),

  /* Error */
    on(AssetTypeActions.error, (state, { reason }) => ({
        ...state,
        error: reason,
        loaded: true
    })),


    /* Reset Params */
    on(AssetTypeActions.resetParams, (state) => ({
        ...state,
        error: null,
        message: null,
        submitted: false
    })),

    on(AssetTypeActions.resetEntities, (state) => (state = undefined)),

)


export function reducer(state: AssetTypeState, action: Action) {
    return assetTypeReducer(state, action);
}
