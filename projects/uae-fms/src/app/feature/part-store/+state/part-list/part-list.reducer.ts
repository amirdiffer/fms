import { Action, createReducer, on } from '@ngrx/store';
import { PartListActions } from './part-list.actions';
import {
  initialState,
  partListAdapter,
  PartListState
} from './part-list.entity';

const partListReducer = createReducer(
  initialState,
  on(PartListActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(PartListActions.allDataLoaded, (state, { data }) =>
    partListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(PartListActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: PartListState, action: Action) {
  return partListReducer(state, action);
}
