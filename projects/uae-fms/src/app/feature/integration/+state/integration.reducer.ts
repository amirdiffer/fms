import { Action, createReducer, on } from '@ngrx/store';
import { IntegrationActions } from './integration.actions';
import {
  initialState,
  integrationAdapter,
  IntegrationState
} from './integration.entity';

const integrationReducer = createReducer(
  initialState,
  on(IntegrationActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(IntegrationActions.allDataLoaded, (state, { data }) =>
    integrationAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(IntegrationActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: IntegrationState, action: Action) {
  return integrationReducer(state, action);
}
