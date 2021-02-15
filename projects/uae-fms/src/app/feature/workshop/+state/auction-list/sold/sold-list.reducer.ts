import { Action, createReducer, on } from '@ngrx/store';
import { SoldListActions } from '@feature/workshop/+state/auction-list/sold/sold-list.actions';
import {
  initialState,
  ISoldListState,
  soldListAdapter
} from '@feature/workshop/+state/auction-list/sold/sold-list.entity';

const soldListReducer = createReducer(
  initialState,
  on(SoldListActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(SoldListActions.allDataLoaded, (state, { data }) =>
    soldListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(SoldListActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: ISoldListState, action: Action) {
  return soldListReducer(state, action);
}
