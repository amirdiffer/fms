import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  organizationAdapter,
  OrganizationState
} from './organization.entity';
import { OrganizationActions } from './organization.actions';

const organizationReducer = createReducer(
  initialState,
  on(OrganizationActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(OrganizationActions.allDataLoaded, (state, { data }) =>
    organizationAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(OrganizationActions.addOrganization, (state, { data }) => ({
    ...state,
    submitted: false
  })),
  on(OrganizationActions.organizationAddedSuccessfully, (state, { data }) =>
    organizationAdapter.addOne(data, { ...state, submitted: true, message: null, error: null })
  ),
  on(OrganizationActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(OrganizationActions.reset, (state) => ({
    ...state,
    submitted: false,
    message: null
  }))
);

export function reducer(state: OrganizationState, action: Action) {
  return organizationReducer(state, action);
}
