import { Action, createReducer, on } from '@ngrx/store';
import {
  subAssetAdapter,
  SubAssetState,
  initialState
} from './sub-asset.entity';
import { SubAssetActions } from './sub-asset.actions';

const subAssetReducer = createReducer(
  initialState,
  on(SubAssetActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(SubAssetActions.allDataLoaded, (state, { data }) =>
    subAssetAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(SubAssetActions.statisticsLoaded, (state, data) => ({
    ...state,
    statistics: data.data
  })),
  on(SubAssetActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(SubAssetActions.addSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    submitted: false
  })),
  on(SubAssetActions.editSubAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(SubAssetActions.editSubAssetSuccessfully, (state, { data }) =>
  subAssetAdapter.updateOne({ changes: data, id: data.id }, {
      ...state,
      error:null,
      message: null,
      submitted: true
    })
  ),

  on(SubAssetActions.addSubAssetSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  /* Asset By Id */
  on(SubAssetActions.subAssetById, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(SubAssetActions.subAssetByIdLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificSubAsset: data
  })),


  on(SubAssetActions.reset, (state) => ({
    ...state,
    submitted: false,
    message: null
  }))
);

export function reducer(state: SubAssetState, action: Action) {
  return subAssetReducer(state, action);
}
