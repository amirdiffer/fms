import { Action, createReducer, on } from '@ngrx/store';
import { PartListActions } from './part-list.actions';
import {
  assetPartListAdapter,
  AssetPartListState,
  initialAssetPartState,
  initialSubAssetPartState,
  subAssetPartListAdapter,
  SubAssetPartListState,
} from './part-list.entity';

/* Asset Part */
const assetPartListReducer = createReducer(
  initialAssetPartState,
  on(PartListActions.getPartListOfAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartListActions.partListOfAssetLoaded, (state, { data }) =>
    assetPartListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(PartListActions.updatePartOfAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    updated: false
  })),

  on(PartListActions.partOfAssetUpdatedSuccessfully, (state, { data }) =>
      assetPartListAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        updated: true
      }
    )
  ),

  on(PartListActions.getSpecificPartOfAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartListActions.specificPartOfAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificPart: data
  })),

  /* ERROR */
  on(PartListActions.errorAssetPart, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  /* RESET */
  on(PartListActions.resetAssetPartState, (state) => ({
    ...state,
    message: null,
    error: null,
    statistics: null,
    specificPart:null,
    updated:false
  })),
 
);


/* Sub Asset Part */
const subAssetPartListReducer = createReducer(
  initialSubAssetPartState,

  on(PartListActions.getPartListOfSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartListActions.partListOfSubAssetLoaded, (state, { data }) =>
    subAssetPartListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(PartListActions.updatePartOfSubAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    updated: false
  })),

  on(PartListActions.partOfSubAssetUpdatedSuccessfully, (state, { data }) =>
      subAssetPartListAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        updated: true
      }
    )
  ),

  on(PartListActions.getSpecificPartOfSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartListActions.specificPartOfSubAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificPart: data
  })),


  /* ERROR */
  on(PartListActions.errorSubAssetPart, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  /* RESET */
  on(PartListActions.resetSubAssetPartState, (state) => ({
    ...state,
    message: null,
    error: null,
    statistics: null,
    specificPart:null,
    updated:false
  })),
  
);


export function assetPartListreducer(state: AssetPartListState, action: Action) {
  return assetPartListReducer(state, action);
};

export function subAssetPartListreducer(state: SubAssetPartListState, action: Action) {
  return subAssetPartListReducer(state, action);
};
