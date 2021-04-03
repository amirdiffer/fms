import { Action, createReducer, on } from '@ngrx/store';
import { ITableState, initialState, tableAdapter } from '../+state/table.entity';
import { TableActions } from '@core/table/+state/table.actions';

const TableReducer = createReducer(
  initialState,
  on(TableActions.initial, (state, { data }) =>
    ({ ...state, pagination: [...state.pagination, { name: data }] })
  ),
);

export function reducer(state: ITableState, action: Action) {
  return TableReducer(state, action);
}
