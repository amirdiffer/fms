import { Action, createReducer, on } from '@ngrx/store';
import { PartMasterActions } from './part-master.actions';
import {
  initialState,
  partMasterAdapter,
  PartMasterState
} from './part-master.entity';

const partMasterReducer = createReducer(
  initialState,
  on(PartMasterActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(PartMasterActions.allDataLoaded, (state, { data }) =>
    partMasterAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(PartMasterActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: PartMasterState, action: Action) {
  return partMasterReducer(state, action);
}
