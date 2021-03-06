import { Action, createReducer, on } from '@ngrx/store';
import { ITableState, initialState, tableAdapter } from '../+state/table.entity';
import { TableActions } from '@core/table/+state/table.actions';

const TableReducer = createReducer(
  initialState,
  on(TableActions.rowCount, (state, { data, name  }) => {
    let i = getIndex(state, name);
    let st = [...state.pagination];
    let copyData = Object.assign({}, st[i]);
    copyData.ipp = data;
    copyData.page = 0;
    st[i] = copyData;
    return ({...state, pagination: st})
  }),
  on(TableActions.count, (state, { data, name  }) => {
    let i = getIndex(state, name);
    let st = [...state.pagination];
    let copyData = Object.assign({}, st[i]);
    copyData.count = data;
    st[i] = copyData;
    return ({...state, pagination: st})
  }),
  on(TableActions.page, (state, { data, name  }) => {
    let i = getIndex(state, name);
    let st = [...state.pagination];
    let copyData = Object.assign({}, st[i]);
    copyData.page = data;
    st[i] = copyData;
    return ({...state, pagination: st})
  }),
  on(TableActions.next, (state, { name  }) => {
    let i = getIndex(state, name);
    let st = [...state.pagination];
    let copyData = Object.assign({}, st[i]);
    let pages = st[i].count > st[i].ipp ? st[i].count / st[i].ipp : 0;
    if(pages > 0) {
      pages = Math.ceil(pages) - 1;
      copyData.page < pages ? copyData.page++ : null;
    }
    st[i] = copyData;
    return ({...state, pagination: st})
  }),
  on(TableActions.previous, (state, { name  }) => {
    let i = getIndex(state, name);
    let st = [...state.pagination];
    let copyData = Object.assign({}, st[i]);
    st[i].page >= 1 ? copyData.page-- : null;
    st[i] = copyData;
    return ({...state, pagination: st})
  }),
  on(TableActions.initial, (state, { ipp, count, name }) => {
    let st = state;
    if(existByName(state, name) == null) {
      st = ({ ...state, pagination: [...state.pagination, { name: name, count: count, page: 0, ipp: ipp }] })
    }
    return st
  }),
  on(TableActions.reset, (state, { name  }) => {
    let i = getIndex(state, name);
    let st = [...state.pagination];
    let copyData = Object.assign({}, st[i]);
    copyData.page = 0;
    copyData.count = 0;
    copyData.ipp = 0;
    st[i] = copyData;
    return ({...state, pagination: st})
  }),
  on(TableActions.filters_initial, (state, { name, value }) => {
    let st = state;
    if(filters_existByName(state, name) == null) {
      st = ({ ...state, filters: [...state.filters, { name: name, value: value }] })
    }
    return st
  }),
  on(TableActions.filters, (state, {name, value}) => {
    let i = filters_getIndex(state, name);
    let st = [...state.filters];
    let copyData = Object.assign({}, st[i]);
    copyData.value = value;
    st[i] = copyData;
    return ({...state, filters: st})
  }),
);

const existByName = (state, name) => {
  let st = [...state.pagination];
  return  st.find(x => x.name === name);
}

const getIndex = (state, name) => {
  let st = [...state.pagination];
  return  st.findIndex(x => x.name === name);
}

const filters_existByName = (state, name) => {
  let st = [...state.filters];
  return  st.find(x => x.name === name);
}

const filters_getIndex = (state, name) => {
  let st = [...state.filters];
  return  st.findIndex(x => x.name === name);
}

export function reducer(state: ITableState, action: Action) {
  return TableReducer(state, action);
}
