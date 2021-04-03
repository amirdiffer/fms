import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const TABLE_FEATURE_KEY = 'table';

export interface ITablePagination {
  name: string;
  count?: number;
  page?: number;
  ipp?:number;
}

export interface ITableState extends EntityState<any> {
    error?: any;
    loaded?: boolean;
    message?: string;
    pagination?: ITablePagination[]
}
export interface ITablePartialState {
  [TABLE_FEATURE_KEY]: ITableState;
}

export const tableAdapter : EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: ITableState = tableAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null,
  pagination: []
} as ITableState);
