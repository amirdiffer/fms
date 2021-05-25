import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const PARTSTORE_ORDER_LIST_FEATURE_KEY = 'orderList';

export interface OrderListState extends EntityState<any> {
  error?: any;
  loaded?: boolean;
  message?: string;
  statistics?:any;
  specificOrder?:any;
  submitted?:boolean;
}

export interface IOrderListPartialState {
  [PARTSTORE_ORDER_LIST_FEATURE_KEY]: OrderListState;
}

export const orderListAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: OrderListState = orderListAdapter.getInitialState(
  {
    loaded: false,
    message: null,
    error: null,
    specificOrder:null,
    statistics:null,
    submitted:false,

  } as OrderListState
);
