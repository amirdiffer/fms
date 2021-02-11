import { Action, createReducer, on } from '@ngrx/store';
import { TollActions } from './toll.actions';
import { initialState, tollAdapter, TollState } from './toll.entity';

const tollReducer = createReducer(
  initialState,
  on(TollActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(TollActions.allDataLoaded, (state, { data }) =>
    tollAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(TollActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: TollState, action: Action) {
  return tollReducer(state, action);
}
