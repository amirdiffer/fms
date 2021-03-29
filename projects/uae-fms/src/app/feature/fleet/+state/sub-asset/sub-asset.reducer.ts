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

  on(SubAssetActions.addSubAssetSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
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
